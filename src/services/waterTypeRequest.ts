import request from '.'
import { WaterType } from '../model/tableModel'

const basic_path = '/water-type'
interface waterType {
  type: string
  description: string
}

export const createWaterType_API = (data: waterType) => request.post<WaterType>(`${basic_path}`, data)
export const deleteWaterType_API = (id: number) => request.delete(`${basic_path}/${id}`)
export const deleteWaterTypeList_API = (idList: number[]) => request.delete(`${basic_path}/delete_multi/${idList}`)
export const updateWaterType_API = (id: number, data: waterType) => request.patch(`${basic_path}/${id}`, data)
export const getWaterTypeAll_API = () => request.get<WaterType[]>(`${basic_path}`)
export const getWaterByType_API = (type: string) => request.get(`${basic_path}/${type}`)
