import request from '.'
import { WaterStorageData } from '../model/tableModel'

const basic_path = '/water-yield'
interface waterStorage {
  resourceId: number;
  addTime: Date;
  addUser: string
  detectTime: Date;
  detectPeople: string[];
  supply: number;
  storage: number;
  isDel: boolean;
  delReason: string;
}

export const createWaterStorage_API = (data: any) => request.post<any>(`${basic_path}`, data)
export const deleteWaterStorage_API = (idList: number[]) => request.delete(`${basic_path}/${idList}`)
export const deleteWaterStorageByDelReason_API = (id: number, delReason: string) => request.delete(`${basic_path}/delete_description/${id}/${delReason}`)
export const deleteWaterStorageList_API = (idList: number[], delReason: string) => request.delete(`${basic_path}/delete_multi/${idList}/${delReason}`)
export const updateWaterStorage_API = (id: number, data: any) => request.patch(`${basic_path}/${id}`, data)
export const getWaterStorageAll_API = () => request.get<WaterStorageData[]>(`${basic_path}`)
export const getWaterStorage_API = (type: string) => request.get(`${basic_path}/${type}`)
export const getStorageListByID_API = (id: number) => request.get<WaterStorageData[]>(`${basic_path}/${id}`,) 