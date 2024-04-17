/**
 * @description 水质管理列表
 */

import { WaterQualityData, WaterQualityTableType } from "../../model/tableModel"
import {
  CREATE_WATER_QUALITY,
  DELETE_WATER_QUALITY,
  DELETE_WATER_QUALITY_BY_REASON,
  DELETE_WATER_QUALITY_LIST,
  FIND_QUALITY_BY_ID,
  GET_WATER_QUALITY_LIST_BYAPI,
  UPDATE_WATER_QUALITY,
  UPDATE_WATER_QUALITY_LIST
} from "../actionTypes/actionTypes"

export const getWaterQualityListByAPI = () => {
  return {
    type: GET_WATER_QUALITY_LIST_BYAPI,
    payLoad: null
  }
}

export const updateWaterQualityList = (waterQualityList: WaterQualityTableType[]) => {
  return {
    type: UPDATE_WATER_QUALITY_LIST,
    payLoad: waterQualityList
  }
}

export const createWaterQuality = (waterQuality: WaterQualityData) => {
  return {
    type: CREATE_WATER_QUALITY,
    waterQuality
  }
}

export const updateWaterQuality = (waterQuality: WaterQualityData, id: number) => {
  return {
    type: UPDATE_WATER_QUALITY,
    waterQuality,
    id
  }
}

export const deleteWaterQuality = (idList: number[]) => {
  return {
    type: DELETE_WATER_QUALITY,
    idList
  }
}

export const deleteWaterQualityByReason = (id: number, delReason: string) => {
  return {
    type: DELETE_WATER_QUALITY_BY_REASON,
    id,
    delReason
  }
}

export const deleteWaterQualityList = (idList: any, delReason: string) => {
  return {
    type: DELETE_WATER_QUALITY_LIST,
    idList,
    delReason
  }
}

export const getWaterQualityByID = (id: number) => {
  return {
    type: FIND_QUALITY_BY_ID,
    id
  }
}