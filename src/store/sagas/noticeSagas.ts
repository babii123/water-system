import { put, call, takeEvery } from "redux-saga/effects"
import { message } from "antd"
import {
  UPDATE_NOTICE,
  DELETE_NOTICE,
  GET_NOTICE_LIST_BYAPI,
} from "../actionTypes/actionTypes"
import {
  getAllNotice_API,
  readNotice_API
} from "../../services/noticeRequest"
import { NoticeListModel } from "../../model/tableModel"
import { updateNoticeList } from "../actions/noticeAction"

function* _getNoticeListByAPI() {
  const { code, data }: { code: number, data: NoticeListModel[] } = yield call(getAllNotice_API)
  if (code === 200 && data) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updateNoticeList(new_data))
  }
}

// function* _deleteNotice(action: { type: string, id: number}) {
//   const { code } = yield call(deleteNotice_API, action.idList)
//   if (code === 200) {
//     yield call(_getNoticeListByAPI)
//     message.success('delete success')
//   } else {
//     message.error('delete error')
//   }
// }

function* _updateNotice(action: { type: string, id: number }) {
  const { code } = yield call(readNotice_API, action.id)
  console.log(code);
  if (code === 200) {
    yield call(_getNoticeListByAPI)
  }
}

function* noticeSagas() {
  yield takeEvery(GET_NOTICE_LIST_BYAPI, _getNoticeListByAPI)
  // yield takeEvery(DELETE_NOTICE, _deleteNotice)
  yield takeEvery(UPDATE_NOTICE, _updateNotice)
}

export default noticeSagas