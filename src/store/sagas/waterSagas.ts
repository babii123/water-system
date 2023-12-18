import { put, call, takeEvery, take } from "redux-saga/effects"
import { CREATE_WATER, DELETE_WATER, DELETE_WATER_LIST, GET_WATER_LIST_BYAPI, UPDATE_WATER, DELETE_WATER_BY_REASON } from "../actionTypes/waterActionTypes"
import { createWater_API, deleteWaterList_API, deleteWater_API, getWaterAll_API, updateWater_API } from "../../services/waterRequest"
import { WaterData } from "../../model/waterModel"
import { updateWaterList } from "../actions/waterActions"
import { message } from "antd"

function* _getWaterListByAPI() {
  console.log('xxx');
  const { code, data }: { code: number, data: WaterData[] } = yield call(getWaterAll_API)
  if (code === 200 && data) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updateWaterList(new_data))
  }
}

function* _createWater(action: { type: string, water: WaterData }) {
  const { code } = yield call(createWater_API, action.water)
  if (code === 200) {
    message.success('create success')
    yield call(_getWaterListByAPI)
  } else {
    message.error('create error')
  }
}

function* _updateWater(action: { type: string, water: WaterData, id: number }) {
  const { code } = yield call(updateWater_API, action.id, action.water)
  if (code === 200) {
    message.success('update success')
    yield call(_getWaterListByAPI)
  } else {
    message.error('update error')
  }
}

function* _deleteWaterByReason(action: { type: string, id: number }) {
  const { code } = yield call(deleteWater_API, action.id)
  if (code === 200) {
    yield call(_getWaterListByAPI)
    message.success('delete success')
  } else {
    message.error('delete error')
  }
}

function* _deleteWaterList(action: { type: string, idList: number[] }) {
  console.log('_deleteList', action.idList);
  const { code } = yield call(deleteWaterList_API, action.idList)
  if (code === 200) {
    message.success('delete list success')
    yield call(_getWaterListByAPI)
  } else {
    message.error('delete list error')
  }
}


function* waterSagas() {
  yield takeEvery(GET_WATER_LIST_BYAPI, _getWaterListByAPI)
  yield takeEvery(CREATE_WATER, _createWater)
  yield takeEvery(UPDATE_WATER, _updateWater)
  yield takeEvery(DELETE_WATER_BY_REASON, _deleteWaterByReason)
  yield takeEvery(DELETE_WATER_LIST, _deleteWaterList)
}

export default waterSagas