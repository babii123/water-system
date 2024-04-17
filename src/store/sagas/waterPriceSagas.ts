import { call, put, takeEvery } from "redux-saga/effects";
import { GET_WATER_PRICE_LIST_BYAPI } from "../actionTypes/actionTypes";
import { WaterPriceData } from "../../model/tableModel";
import { getWaterPriceAll_API } from "../../services/waterPriceRequest";
import { updateWaterPriceList } from "../actions/waterPriceActions";

function* _getWaterPriceListByAPI() {
  const { code, data }: { code: number, data: WaterPriceData[] } = yield call(getWaterPriceAll_API)
  if (code === 200 && data) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updateWaterPriceList(new_data))
  }
}

export default function* waterPriceSagas() {
  yield takeEvery(GET_WATER_PRICE_LIST_BYAPI,_getWaterPriceListByAPI)
}