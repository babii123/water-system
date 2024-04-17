import { ActionModel } from "../../model/globalModel"
import { WaterQualityTableType } from "../../model/tableModel"
import { UPDATE_WATER_QUALITY_LIST } from "../actionTypes/actionTypes"

const defaultState: {
  waterQualityList: WaterQualityTableType[]
} = {
  waterQualityList: []
}

export const waterQualityReducer = (state = defaultState, action: ActionModel) => {
  switch (action.type) {
    case UPDATE_WATER_QUALITY_LIST:
      return {
        ...state,
        waterQualityList: action.payLoad
      }
    default:
      return state
  }
}