/**
 * @description 水价管理列表
 */

import { WaterPriceTableType } from "../../model/tableModel"
import {
  GET_WATER_PRICE_LIST_BYAPI,
  UPDATE_WATER_PRICE_LIST
} from "../actionTypes/actionTypes"

export const getWaterPriceListByAPI = () => {
  return {
    type: GET_WATER_PRICE_LIST_BYAPI,
    payLoad: null
  }
}

export const updateWaterPriceList = (waterPriceList: WaterPriceTableType[]) => {
  return {
    type: UPDATE_WATER_PRICE_LIST,
    payLoad: waterPriceList
  }
}