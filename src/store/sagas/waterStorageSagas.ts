import { put, call, takeEvery } from "redux-saga/effects"
import {
  CREATE_WATER_STORAGE,
  DELETE_WATER_STORAGE,
  DELETE_WATER_STORAGE_BY_REASON,
  DELETE_WATER_STORAGE_LIST,
  FIND_STORAGE_BY_ID,
  GET_WATER_STORAGE_LIST_BYAPI,
  UPDATE_WATER_STORAGE,
} from "../actionTypes/actionTypes"
import {
  createWaterStorage_API,
  deleteWaterStorageList_API,
  deleteWaterStorageByDelReason_API,
  getWaterStorageAll_API,
  updateWaterStorage_API,
  getStorageListByID_API,
  deleteWaterStorage_API
} from "../../services/waterStorageRequest"
import { WaterStorageData } from "../../model/tableModel"
import { updateWaterStorageList } from "../actions/waterStorageActions"
import { message } from "antd"

function* _getWaterStorageListByAPI() {
  const { code, data }: { code: number, data: WaterStorageData[] } = yield call(getWaterStorageAll_API)
  if (code === 200 && data) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updateWaterStorageList(new_data))
  }
}

function* _createWaterStorage(action: { type: string, waterQuality: WaterStorageData }) {
  const { code } = yield call(createWaterStorage_API, action.waterQuality)
  if (code === 200) {
    message.success('create success')
    yield call(_getWaterStorageListByAPI)
  } else {
    message.error('create error')
  }
}

function* _updateWaterStorage(action: { type: string, waterQuality: WaterStorageData, id: number }) {
  const { code } = yield call(updateWaterStorage_API, action.id, action.waterQuality)
  if (code === 200) {
    message.success('update success')
    yield call(_getWaterStorageListByAPI)
  } else {
    message.error('update error')
  }
}

function* _deleteWaterStorage(action: { type: string, idList: number[] }) {
  const { code } = yield call(deleteWaterStorage_API, action.idList)
  if (code === 200) {
    yield call(_getWaterStorageListByAPI)
    message.success('delete success')
  } else {
    message.error('delete error')
  }
}

function* _deleteWaterStorageByReason(action: { type: string, id: number, delReason: string }) {
  const { code } = yield call(deleteWaterStorageByDelReason_API, action.id, action.delReason)
  if (code === 200) {
    yield call(_getWaterStorageListByAPI)
    message.success('delete success')
  } else {
    message.error('delete error')
  }
}

function* _deleteWaterStorageList(action: { type: string, idList: number[], delReason: string }) {
  const { code } = yield call(deleteWaterStorageList_API, action.idList, action.delReason)
  if (code === 200) {
    message.success('delete list success')
    yield call(_getWaterStorageListByAPI)
  } else {
    message.error('delete list error')
  }
}

function* _getWaterStorageByID(action: any) {
  const { id } = action
  const { code, data }: { code: number, data: WaterStorageData[] } = yield call(getStorageListByID_API, id)
  if (code === 200 && data) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updateWaterStorageList(new_data))
    message.success('find success')
  } else {
    message.error('find fail')
  }
}


function* waterStorageSagas() {
  yield takeEvery(GET_WATER_STORAGE_LIST_BYAPI, _getWaterStorageListByAPI)
  yield takeEvery(CREATE_WATER_STORAGE, _createWaterStorage)
  yield takeEvery(UPDATE_WATER_STORAGE, _updateWaterStorage)
  yield takeEvery(DELETE_WATER_STORAGE, _deleteWaterStorage)
  yield takeEvery(DELETE_WATER_STORAGE_BY_REASON, _deleteWaterStorageByReason)
  yield takeEvery(DELETE_WATER_STORAGE_LIST, _deleteWaterStorageList)
  yield takeEvery(FIND_STORAGE_BY_ID, _getWaterStorageByID)
}

export default waterStorageSagas