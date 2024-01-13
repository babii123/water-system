import { ActionModel } from "../../model/globalModel"
import { WaterTypeTableType } from "../../model/waterTypeModel"
import { UPDATE_WATER_TYPE_LIST } from "../actionTypes/waterTypeActionTypes"

const defaultState: {
  waterTypeList: WaterTypeTableType[]
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