import { ActionModel } from "../../model/globalModel"
import { WaterStorageTableType } from "../../model/waterStorageModel"
import { UPDATE_WATER_STORAGE_LIST } from "../actionTypes/waterStorageActionTypes"

const defaultState: {
  waterStorageList: WaterStorageTableType[]
} = {
  waterStorageList: []
}

export const waterStorageReducer = (state = defaultState, action: ActionModel) => {
  switch (action.type) {
    case UPDATE_WATER_STORAGE_LIST:
      return {
        ...state,
        waterStorageList: action.payLoad
      }
    default:
      return state
  }
}