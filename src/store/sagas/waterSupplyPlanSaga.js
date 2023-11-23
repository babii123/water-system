import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { GET_WATER_DATA, GET_WATER_PRICE, UPDATE_WATER_DATA, UPDATE_WATER_PRICE } from "../actionTypes/waterSupplyPlanActionType";
import { getWaterData, getWaterPrice } from "../../api";

function* waterSupplyPlanSaga() {

      // yield takeLatest(GET_WATER_PRICE, function* () {
      //       const res = yield call(getWaterPrice);
      //       console.log('GET_WATER_PRICE', res.data);
      //       // 保存数据
      //       put(UPDATE_WATER_PRICE, res.data)
      // })

      yield takeEvery(GET_WATER_DATA, function* () {
            try {
                  const res = yield call(getWaterData);
                  const data = res.data.map(item => {
                        return { key: item.id, ...item }
                  });
                  // console.log('GET_WATER_DATA', data);
                  // 保存数据
                  if (res.code === 200){
                        yield put({
                              type: UPDATE_WATER_DATA,
                              payLoad: data
                        })
                  }
            } catch (error) {

            }

      })
}

export default waterSupplyPlanSaga;