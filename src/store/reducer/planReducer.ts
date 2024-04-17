import { ActionModel } from "../../model/globalModel"
import { PlanTableType } from "../../model/tableModel"
import { UPDATE_PLAN_LIST } from "../actionTypes/actionTypes"

const defaultState: {
  planList: PlanTableType[]
} = {
  planList: []
}

export const planReducer = (state = defaultState, action: ActionModel) => {
  switch (action.type) {
    case UPDATE_PLAN_LIST:
      return {
        ...state,
        planList: action.payLoad
      }
    default:
      return state
  }
}