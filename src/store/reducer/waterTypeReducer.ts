import { ActionModel } from "../../model/globalModel"
import { WaterTypeDataType } from "../../model/waterTypeModel"
import { UPDATE_WATER_TYPE_LIST } from "../actionTypes/waterTypeActionTypes"

const defaultState: {
  waterTypeList: WaterTypeDataType[]
} = {
  waterTypeList: []
}

export const waterTypeReducer = (state = defaultState, action: ActionModel) => {
  switch (action.type) {
    case UPDATE_WATER_TYPE_LIST:
      return {
        ...state,
        waterTypeList: action.payLoad
      }
    default:
      return state
  }
}