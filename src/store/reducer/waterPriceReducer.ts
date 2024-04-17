import { ActionModel } from "../../model/globalModel"
import { WaterPriceTableType } from "../../model/tableModel"
import { UPDATE_WATER_PRICE_LIST } from "../actionTypes/actionTypes"

const defaultState: {
  waterPriceList: WaterPriceTableType[]
} = {
  waterPriceList: []
}

export const waterPriceReducer = (state = defaultState, action: ActionModel) => {
  switch (action.type) {
    case UPDATE_WATER_PRICE_LIST:
      return {
        ...state,
        waterPriceList: action.payLoad
      }
    default:
      return state
  }
}
