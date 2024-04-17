import { put, call, takeEvery, take } from "redux-saga/effects"
import { CREATE_WATER_TYPE, DELETE_WATER_TYPE, DELETE_WATER_TYPE_LIST, GET_WATER_TYPE_LIST_BYAPI, UPDATE_WATER_TYPE } from "../actionTypes/waterTypeActionTypes"
import { createWaterType_API, deleteWaterTypeList_API, deleteWaterType_API, getWaterTypeAll_API, updateWaterType_API } from "../../services/waterTypeRequest"
import { WaterType } from "../../model/waterTypeModel"
import { updateWaterTypeList } from "../actions/waterTypeActions"
import { message } from "antd"

function* _getWaterTypeListByAPI() {
  const { code, data }: { code: number, data: WaterType[] } = yield call(getWaterTypeAll_API)
  if (code === 200 && data) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updateWaterTypeList(new_data))
  }
}

function* _createWaterType(action: { type: string, waterType: WaterType }) {
  const { code } = yield call(createWaterType_API, action.waterType)
  if (code === 200) {
    message.success('create success')
    yield call(_getWaterTypeListByAPI)
  } else {
    message.error('create error')
  }
}

function* _updateWaterType(action: { type: string, waterType: WaterType, id: number }) {
  const { code } = yield call(updateWaterType_API, action.id, action.waterType)
  if (code === 200) {
    message.success('update success')
    yield call(_getWaterTypeListByAPI)
  } else {
    message.error('update error')
  }
}

function* _deleteWaterType(action: { type: string, id: number }) {
  const { code } = yield call(deleteWaterType_API, action.id)
  if (code === 200) {
    yield call(_getWaterTypeListByAPI)
    message.success('delete success')
  } else {
    message.error('delete error')
  }
}

function* _deleteWaterTypeList(action: { type: string, idList: number[] }) {
  console.log('_deleteList', action.idList);
  const { code } = yield call(deleteWaterTypeList_API, action.idList)
  if (code === 200) {
    message.success('delete list success')
    yield call(_getWaterTypeListByAPI)
  } else {
    message.error('delete list error')
  }
}


function* waterTypeSagas() {
  yield takeEvery(GET_WATER_TYPE_LIST_BYAPI, _getWaterTypeListByAPI)
  yield takeEvery(CREATE_WATER_TYPE, _createWaterType)
  yield takeEvery(UPDATE_WATER_TYPE, _updateWaterType)
  yield takeEvery(DELETE_WATER_TYPE, _deleteWaterType)
  yield takeEvery(DELETE_WATER_TYPE_LIST, _deleteWaterTypeList)
}

export default waterTypeSagas