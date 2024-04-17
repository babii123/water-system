import { ActionModel } from "../../model/globalModel"
import { WaterTableType } from "../../model/tableModel"
import { UPDATE_WATER_LIST } from "../actionTypes/actionTypes"

const defaultState: {
  waterList: WaterTableType[]
} = {
  waterList: []
}

export const waterReducer = (state = defaultState, action: ActionModel) => {
  switch (action.type) {
    case UPDATE_WATER_LIST:
      return {
        ...state,
        waterList: action.payLoad
      }
    default:
      return state
  }
}