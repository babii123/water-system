import { call, put, takeEvery } from "redux-saga/effects";
import { DELETE_USER, DELETE_USER_LIST, GET_USER_LIST_BYAPI, CREATE_USER, UPDATE_USER, FIND_USER_BY_CONDITION } from "../actionTypes/userListActionTypes";
import { deleteUser_API, getUserAll_API, deleteUserList_API, updateUser_API, createUser_API, getUserListByCondition_API } from "../../services/userRequest";
import { UserInfo } from "../../model/userInfoModel";
import { updateUserList } from "../actions/userListActions";
import { message } from "antd";

function* _getUserListByAPI() {
  // 调用接口
  const { code, data }: { code: number, data: UserInfo[] } = yield call(getUserAll_API)
  if (code === 200 && data) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updateUserList(new_data))
  }
}

function* _updateUser(action: { type: string, updateUserInfo: any, userId: string }) {
  const { code } = yield call(updateUser_API, action.updateUserInfo, action.userId)
  if (code === 200) {
    message.success('update success')
    yield call(_getUserListByAPI)
  } else {
    message.error('update error')
  }
}

function* _createUser(action: { type: string, userInfo: any }) {
  const { code } = yield call(createUser_API, action.userInfo)
  if (code === 200) {
    message.success('create success')
    yield call(_getUserListByAPI)
  } else {
    message.error('create error')
  }
}

function* _deleteUser(action: { type: string, userId: string }) {
  const { code } = yield call(deleteUser_API, action.userId)
  if (code === 200) {
    yield call(_getUserListByAPI)
  }
}

function* _deleteUserList(action: { type: string, idList: number[] }) {
  console.log('_deleteList', action.idList);
  const { code } = yield call(deleteUserList_API, action.idList)
  if (code === 200) {
    yield call(_getUserListByAPI)
  }
}

function* _findUserByCondition(action: { email?: string, realName?: string, phone?: string }) {
  const { email, realName, phone } = action
  const { code, data }: { code: number, data: UserInfo[] } = yield call(getUserListByCondition_API, email, realName, phone)
  if (code === 200) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updateUserList(new_data))
    message.success('find success')
  } else {
    message.error('find fail')
  }
}

function* userListSagas() {
  yield takeEvery(GET_USER_LIST_BYAPI, _getUserListByAPI)
  yield takeEvery(UPDATE_USER, _updateUser)
  yield takeEvery(CREATE_USER, _createUser)
  yield takeEvery(DELETE_USER, _deleteUser)
  yield takeEvery(DELETE_USER_LIST, _deleteUserList)
  yield takeEvery(FIND_USER_BY_CONDITION, _findUserByCondition)
}
export default userListSagas