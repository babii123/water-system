import { put, call, takeEvery } from "redux-saga/effects"
import {
  CREATE_WATER,
  DELETE_WATER,
  DELETE_WATER_LIST,
  GET_WATER_LIST_BYAPI,
  UPDATE_WATER,
  DELETE_WATER_BY_REASON,
  FIND_WATER_BY_CONDITION
} from "../actionTypes/actionTypes"
import {
  createWater_API,
  deleteWaterList_API,
  deleteWaterByDelReason_API,
  getWaterAll_API,
  updateWater_API,
  getWaterListByCondition_API,
  deleteWater_API
} from "../../services/waterRequest"
import { WaterData } from "../../model/tableModel"
import { updateWaterList } from "../actions/waterActions"
import { message } from "antd"

function* _getWaterListByAPI() {
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

function* _deleteWater(action: { type: string, idList: number[] }) {
  const { code } = yield call(deleteWater_API, action.idList)
  if (code === 200) {
    yield call(_getWaterListByAPI)
    message.success('delete success')
  } else {
    message.error('delete error')
  }
}

function* _deleteWaterByReason(action: { type: string, id: number, delReason: string }) {
  const { code } = yield call(deleteWaterByDelReason_API, action.id, action.delReason)
  if (code === 200) {
    yield call(_getWaterListByAPI)
    message.success('delete success')
  } else {
    message.error('delete error')
  }
}

function* _deleteWaterList(action: { type: string, idList: number[], delReason: string }) {
  console.log('_deleteList', action.idList);
  const { code } = yield call(deleteWaterList_API, action.idList, action.delReason)
  if (code === 200) {
    message.success('delete list success')
    yield call(_getWaterListByAPI)
  } else {
    message.error('delete list error')
  }
}

function* _findWaterByCondition(action: any) {
  const { waterArea, waterType } = action
  const { code, data }: { code: number, data: WaterData[] } = yield call(getWaterListByCondition_API, waterArea, waterType)
  if (code === 200) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updateWaterList(new_data))
    message.success('find success')
  } else {
    message.error('find fail')
  }
}

function* waterSagas() {
  yield takeEvery(GET_WATER_LIST_BYAPI, _getWaterListByAPI)
  yield takeEvery(CREATE_WATER, _createWater)
  yield takeEvery(UPDATE_WATER, _updateWater)
  yield takeEvery(DELETE_WATER, _deleteWater)
  yield takeEvery(DELETE_WATER_BY_REASON, _deleteWaterByReason)
  yield takeEvery(DELETE_WATER_LIST, _deleteWaterList)
  yield takeEvery(FIND_WATER_BY_CONDITION, _findWaterByCondition)
}

export default waterSagas