import request from '.'
import { WaterQualityData } from '../model/tableModel'

const basic_path = '/water-quality'
interface waterQuality {
  resourceId: number
  addTime: Date
  addUser: string
  detectTime: Date
  detectPeople: string[]
  ph: number
  turbidity: number
  fluoride: number
  cyanin: number
  isDel: boolean
  delReason: string
}

export const createWaterQuality_API = (data: waterQuality) => request.post<WaterQualityData>(`${basic_path}`, data)
export const deleteWaterQuality_API = (idList: number[]) => request.delete(`${basic_path}/${idList}`)
export const deleteWaterQualityByDelReason_API = (id: number, delReason: string) => request.delete(`${basic_path}/delete_description/${id}/${delReason}`)
export const deleteWaterQualityList_API = (idList: number[], delReason: string) => request.delete(`${basic_path}/delete_multi/${idList}/${delReason}`)
export const updateWaterQuality_API = (id: number, data: waterQuality) => request.patch(`${basic_path}/${id}`, data)
export const getWaterQualityAll_API = () => request.get<WaterQualityData[]>(`${basic_path}`)
export const getWaterQuality_API = (type: string) => request.get(`${basic_path}/${type}`)
export const getQualityListByID_API = (id: number) => request.get<WaterQualityData[]>(`${basic_path}/${id}`,) 