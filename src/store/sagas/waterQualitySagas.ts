import { put, call, takeEvery } from "redux-saga/effects"
import { CREATE_WATER_QUALITY, DELETE_WATER_QUALITY, DELETE_WATER_QUALITY_LIST, GET_WATER_QUALITY_LIST_BYAPI, UPDATE_WATER_QUALITY, DELETE_WATER_QUALITY_BY_REASON } from "../actionTypes/waterQualityActionTypes"
import { createWaterQuality_API, deleteWaterQualityList_API, deleteWaterQualityByDelReason_API, getWaterQualityAll_API, updateWaterQuality_API } from "../../services/waterQualityRequest"
import { WaterQualityData } from "../../model/waterQualityModel"
import { updateWaterQualityList } from "../actions/waterQualityActions"
import { message } from "antd"

function* _getWaterQualityListByAPI() {
  console.log('xxx');
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

function* _deleteWaterQualityList(action: { type: string, idList: number[] }) {
  console.log('_deleteList', action.idList);
  const { code } = yield call(deleteWaterQualityList_API, action.idList)
  if (code === 200) {
    message.success('delete list success')
    yield call(_getWaterQualityListByAPI)
  } else {
    message.error('delete list error')
  }
}


function* waterQualitySagas() {
  yield takeEvery(GET_WATER_QUALITY_LIST_BYAPI, _getWaterQualityListByAPI)
  yield takeEvery(CREATE_WATER_QUALITY, _createWaterQuality)
  yield takeEvery(UPDATE_WATER_QUALITY, _updateWaterQuality)
  yield takeEvery(DELETE_WATER_QUALITY_BY_REASON, _deleteWaterQualityByReason)
  yield takeEvery(DELETE_WATER_QUALITY, _deleteWaterQualityList)
}

export default waterQualitySagas