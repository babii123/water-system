import request from '.'
import { WaterData } from '../model/waterModel'

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
export const deleteWater_API = (id: number) => request.delete(`${basic_path}/${id}`)
export const deleteWaterByDelReason_API = (id: number, delReason: string) => request.delete(`${basic_path}/delete_description/${id}/${delReason}`)
export const deleteWaterList_API = (idList: number[]) => request.delete(`${basic_path}/delete_multi/${idList}`)
export const updateWater_API = (id: number, data: water) => request.patch(`${basic_path}/${id}`, data)
export const getWaterAll_API = () => request.get<WaterData[]>(`${basic_path}`)
export const getWater_API = (type: string) => request.get(`${basic_path}/${type}`)
