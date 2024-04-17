/**
 * @description 水资源类型管理列表
 */

import { WaterData, WaterTableType } from "../../model/tableModel"
import {
  CREATE_WATER,
  DELETE_WATER,
  DELETE_WATER_BY_REASON,
  DELETE_WATER_LIST,
  FIND_WATER_BY_CONDITION,
  GET_WATER_LIST_BYAPI,
  UPDATE_WATER,
  UPDATE_WATER_LIST
} from "../actionTypes/actionTypes"

export const getWaterListByAPI = () => {
  return {
    type: GET_WATER_LIST_BYAPI,
    payLoad: null
  }
}

export const updateWaterList = (waterList: WaterTableType[]) => {
  return {
    type: UPDATE_WATER_LIST,
    payLoad: waterList
  }
}

export const createWater = (water: WaterData) => {
  return {
    type: CREATE_WATER,
    water
  }
}

export const updateWater = (water: WaterData, id: number) => {
  return {
    type: UPDATE_WATER,
    water,
    id
  }
}

export const deleteWater = (idList: number[]) => {
  return {
    type: DELETE_WATER,
    idList
  }
}

export const deleteWaterByReason = (id: number, delReason: string) => {
  return {
    type: DELETE_WATER_BY_REASON,
    id,
    delReason
  }
}

export const deleteWaterList = (idList: any, delReason: string) => {
  return {
    type: DELETE_WATER_LIST,
    idList,
    delReason
  }
}

export const getWaterListByCondition = (waterArea?: string, waterType?: string) => {
  return {
    type: FIND_WATER_BY_CONDITION,
    waterArea,
    waterType
  }
}