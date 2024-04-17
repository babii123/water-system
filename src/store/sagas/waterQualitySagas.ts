import { put, call, takeEvery } from "redux-saga/effects"
import {
  CREATE_WATER_QUALITY,
  DELETE_WATER_QUALITY,
  DELETE_WATER_QUALITY_BY_REASON,
  DELETE_WATER_QUALITY_LIST,
  FIND_QUALITY_BY_ID,
  GET_WATER_QUALITY_LIST_BYAPI,
  UPDATE_WATER_QUALITY,
} from "../actionTypes/actionTypes"
import {
  createWaterQuality_API,
  deleteWaterQualityList_API,
  deleteWaterQualityByDelReason_API,
  getWaterQualityAll_API,
  updateWaterQuality_API,
  getQualityListByID_API,
  deleteWaterQuality_API
} from "../../services/waterQualityRequest"
import { WaterQualityData } from "../../model/tableModel"
import { updateWaterQualityList } from "../actions/waterQualityActions"
import { message } from "antd"

function* _getWaterQualityListByAPI() {
  const { code, data }: { code: number, data: WaterQualityData[] } = yield call(getWaterQualityAll_API)
  if (code === 200 && data) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updateWaterQualityList(new_data))
  }
}

function* _createWaterQuality(action: { type: string, waterQuality: WaterQualityData }) {
  const { code } = yield call(createWaterQuality_API, action.waterQuality)
  if (code === 200) {
    message.success('create success')
    yield call(_getWaterQualityListByAPI)
  } else {
    message.error('create error')
  }
}

function* _updateWaterQuality(action: { type: string, waterQuality: WaterQualityData, id: number }) {
  const { code } = yield call(updateWaterQuality_API, action.id, action.waterQuality)
  if (code === 200) {
    message.success('update success')
    yield call(_getWaterQualityListByAPI)
  } else {
    message.error('update error')
  }
}

function* _deleteWaterQualityByReason(action: { type: string, id: number, delReason: string }) {
  const { code } = yield call(deleteWaterQualityByDelReason_API, action.id, action.delReason)
  if (code === 200) {
    yield call(_getWaterQualityListByAPI)
    message.success('delete success')
  } else {
    message.error('delete error')
  }
}

function* _deleteWaterQuality(action: { type: string, idList: number[] }) {
  const { code } = yield call(deleteWaterQuality_API, action.idList)
  if (code === 200) {
    yield call(_getWaterQualityListByAPI)
    message.success('delete success')
  } else {
    message.error('delete error')
  }
}

function* _deleteWaterQualityList(action: { type: string, idList: number[], delReason: string }) {
  const { code } = yield call(deleteWaterQualityList_API, action.idList, action.delReason)
  if (code === 200) {
    message.success('delete list success')
    yield call(_getWaterQualityListByAPI)
  } else {
    message.error('delete list error')
  }
}

function* _getWaterQualityByID(action: any) {
  const { id } = action
  const { code, data }: { code: number, data: WaterQualityData[] } = yield call(getQualityListByID_API, id)
  if (code === 200 && data) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updateWaterQualityList(new_data))
    message.success('find success')
  } else {
    message.error('find fail')
  }
}
function* waterQualitySagas() {
  yield takeEvery(GET_WATER_QUALITY_LIST_BYAPI, _getWaterQualityListByAPI)
  yield takeEvery(CREATE_WATER_QUALITY, _createWaterQuality)
  yield takeEvery(UPDATE_WATER_QUALITY, _updateWaterQuality)
  yield takeEvery(DELETE_WATER_QUALITY, _deleteWaterQuality)
  yield takeEvery(DELETE_WATER_QUALITY_BY_REASON, _deleteWaterQualityByReason)
  yield takeEvery(DELETE_WATER_QUALITY_LIST, _deleteWaterQualityList)
  yield takeEvery(FIND_QUALITY_BY_ID, _getWaterQualityByID)
}

export default waterQualitySagas