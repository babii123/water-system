import request from '.'
import { WaterData } from '../model/tableModel'

const basic_path = '/water'
interface water {
  type: string
  waterName: string
  address: string
  description: string
  addTime: Date
  addUser: string
  checkUser: string[]
  isDel: boolean
  delReason: string
}

export const createWater_API = (data: water) => request.post<WaterData>(`${basic_path}`, data)
export const deleteWater_API = (idList: number[]) => request.delete(`${basic_path}/${idList}`)
export const deleteWaterByDelReason_API = (id: number, delReason: string) => request.delete(`${basic_path}/delete_description/${id}/${delReason}`)
export const deleteWaterList_API = (idList: number[], delReason: string) => request.delete(`${basic_path}/delete_multi/${idList}/${delReason}`)
export const updateWater_API = (id: number, data: water) => request.patch(`${basic_path}/${id}`, data)
export const getWaterAll_API = () => request.get<WaterData[]>(`${basic_path}`)
export const getWater_API = (type: string) => request.get(`${basic_path}/${type}`)
export const getWaterListByCondition_API = (waterArea?: string, waterType?: string) => request.get(`${basic_path}/findByCondition?waterArea=${waterArea ? waterArea : ''}&waterType=${waterType ? waterType : ''}`) 