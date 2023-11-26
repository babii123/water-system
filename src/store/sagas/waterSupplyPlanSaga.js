import { call, put, takeLatest } from "redux-saga/effects";
import {
	GET_WATER_DATA,
	UPDATE_WATER_DATA,
	GET_WATER_PRICE,
	UPDATE_WATER_PRICE
} from "../actionTypes/waterSupplyPlanActionType";
import { getWaterData, getWaterPrice } from "../../api";

function* waterSupplyPlanSaga() {

	yield takeLatest(GET_WATER_PRICE, function* () {
		try {
			const res = yield call(getWaterPrice);
			console.log('GET_WATER_PRICE', res.data);
			if (res.code === 200) {
				// 保存数据
				yield put(UPDATE_WATER_PRICE, res.data)
			} else {
				console.log('waterSupplyPlanSaga:', res.message);
			}
		} catch (error) {

		}

	})

	yield takeLatest(GET_WATER_DATA, function* () {
		try {
			const res = yield call(getWaterData);
			const data = res.data.map(item => {
				return { key: item.id, ...item }
			});
			// 保存数据
			if (res.code === 200) {
				yield put({
					type: UPDATE_WATER_DATA,
					payLoad: data
				})
			}else{
				console.log('waterSupplyPlanSaga:', res.message);
			}
		} catch (error) {
			console.log('waterSupplyPlanSaga:', error);
		}
	})
}

export default waterSupplyPlanSaga;