/**
 * @description 水量管理列表
 */

import { WaterStorageData, WaterStorageTableType } from "../../model/waterStorageModel"
import { CREATE_WATER_STORAGE, DELETE_WATER_STORAGE, DELETE_WATER_STORAGE_BY_REASON, DELETE_WATER_STORAGE_LIST, GET_WATER_STORAGE_LIST_BYAPI, UPDATE_WATER_STORAGE, UPDATE_WATER_STORAGE_LIST } from "../actionTypes/waterStorageActionTypes"

export const getWaterStorageListByAPI = () => {
  return {
    type: GET_WATER_STORAGE_LIST_BYAPI,
    payLoad: null
  }
}

export const updateWaterStorageList = (waterStorageList: WaterStorageTableType[]) => {
  return {
    type: UPDATE_WATER_STORAGE_LIST,
    payLoad: waterStorageList
  }
}

export const createWaterStorage = (waterStorage: WaterStorageData) => {
  return {
    type: CREATE_WATER_STORAGE,
    waterStorage
  }
}

export const updateWaterStorage = (waterStorage: WaterStorageData, id: number) => {
  return {
    type: UPDATE_WATER_STORAGE,
    waterStorage,
    id
  }
}

export const deleteWaterStorage = (id: number) => {
  return {
    type: DELETE_WATER_STORAGE,
    id
  }
}

export const deleteWaterStorageByReason = (id: number, delReason: string) => {
  return {
    type: DELETE_WATER_STORAGE_BY_REASON,
    id,
    delReason
  }
}

export const deleteWaterStorageList = (idList: any) => {
  return {
    type: DELETE_WATER_STORAGE_LIST,
    idList
  }
} 