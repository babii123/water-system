import { ActionModel } from "../../model/globalModel"
import { WaterQualityTableType } from "../../model/waterQualityModel"
import { UPDATE_WATER_QUALITY_LIST } from "../actionTypes/waterQualityActionTypes"

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