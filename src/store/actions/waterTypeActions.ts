/**
 * @description 水资源类型管理列表
 */

import { WaterType, WaterTypeTableType } from "../../model/waterTypeModel"
import { CREATE_WATER_TYPE, DELETE_WATER_TYPE, DELETE_WATER_TYPE_LIST, GET_WATER_TYPE_LIST_BYAPI, UPDATE_WATER_TYPE, UPDATE_WATER_TYPE_LIST } from "../actionTypes/waterTypeActionTypes"

export const getWaterTypeListByAPI = () => {
  return {
    type: GET_WATER_TYPE_LIST_BYAPI,
    payLoad: null
  }
}

export const updateWaterTypeList = (waterTypeList: WaterTypeTableType[]) => {
  return {
    type: UPDATE_WATER_TYPE_LIST,
    payLoad: waterTypeList
  }
}

export const createWaterType = (waterType: WaterType) => {
  return {
    type: CREATE_WATER_TYPE,
    waterType
  }
}

export const updateWaterType = (waterType: WaterType, id: number) => {
  return {
    type: UPDATE_WATER_TYPE,
    waterType,
    id
  }
}

export const deleteWaterType = (id: number) => {
  return {
    type: DELETE_WATER_TYPE,
    id
  }
}

export const deleteWaterTypeList = (idList: any) => {
  return {
    type: DELETE_WATER_TYPE_LIST,
    idList
  }
}