/**
 * @description 供水计划管理列表
 */

import { PlanData, PlanTableType } from "../../model/planModel"
import { CREATE_PLAN, DELETE_PLAN, DELETE_PLAN_BY_REASON, DELETE_PLAN_LIST, FIND_PLAN_BY_CONDITION, GET_PLAN_LIST_BYAPI, UPDATE_PLAN, UPDATE_PLAN_LIST } from "../actionTypes/planActionTypes"

export const getPlanListByAPI = () => {
  return {
    type: GET_PLAN_LIST_BYAPI,
    payLoad: null
  }
}

export const updatePlanList = (planList: PlanTableType[]) => {
  return {
    type: UPDATE_PLAN_LIST,
    payLoad: planList
  }
}

export const createPlan = (plan: PlanData) => {
  return {
    type: CREATE_PLAN,
    plan
  }
}

export const updatePlan = (plan: PlanData, id: number) => {
  return {
    type: UPDATE_PLAN,
    plan,
    id
  }
}

export const deletePlan = (id: number) => {
  return {
    type: DELETE_PLAN,
    id
  }
}

export const deletePlanByReason = (id: number, delReason: string) => {
  return {
    type: DELETE_PLAN_BY_REASON,
    id,
    delReason
  }
}

export const deletePlanList = (idList: any) => {
  return {
    type: DELETE_PLAN_LIST,
    idList
  }
}

export const getPlanListByCondition = (waterArea?: string, waterPriceType?: string) => {
  return {
    type: FIND_PLAN_BY_CONDITION,
    waterArea,
    waterPriceType
  }
} 