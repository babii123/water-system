/**
 * @description 供水计划管理列表
 */

import { PlanData, PlanTableType } from "../../model/tableModel"
import {
  CREATE_PLAN,
  DELETE_PLAN,
  DELETE_PLAN_BY_REASON,
  DELETE_PLAN_LIST,
  FIND_PLAN_BY_CONDITION,
  GET_PLAN_LIST_BYAPI,
  UPDATE_PLAN,
  UPDATE_PLAN_LIST
} from "../actionTypes/actionTypes"

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

export const createPlan = (plan: any) => {
  return {
    type: CREATE_PLAN,
    plan
  }
}

export const updatePlan = (plan: any, id: number) => {
  return {
    type: UPDATE_PLAN,
    plan,
    id
  }
}

export const deletePlan = (idList: number[]) => {
  return {
    type: DELETE_PLAN,
    idList
  }
}

export const deletePlanByReason = (id: number, delReason: string) => {
  return {
    type: DELETE_PLAN_BY_REASON,
    id,
    delReason
  }
}

export const deletePlanList = (idList: any, delReason: string) => {
  return {
    type: DELETE_PLAN_LIST,
    idList,
    delReason
  }
}

export const getPlanListByCondition = (waterArea?: string, waterPriceType?: string) => {
  return {
    type: FIND_PLAN_BY_CONDITION,
    waterArea,
    waterPriceType
  }
} 