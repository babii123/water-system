import { ActionModel } from "../../model/globalModel"
import { WaterTableType } from "../../model/waterModel"
import { UPDATE_WATER_LIST } from "../actionTypes/waterActionTypes"

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