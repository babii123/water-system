import request from '.'
import { PlanData, WaterLinkData } from '../model/tableModel'

const basic_path = '/supply-plan'
const basic_path1 = '/water-link'
interface Plan {
  addTime: Date
  startTime: Date
  endTime: Date
  waterSources: string[]
  waterArea: string
  waterPriceType: string
  description: string
  addUser: string
  isDel: boolean
  delReason: string
}

interface WaterLink {
  title: string;
  link: string;
}

export const createPlan_API = (data: any) => request.post<PlanData>(`${basic_path}`, data)
export const deletePlan_API = (idList: number[]) => request.delete(`${basic_path}/${idList}`)
export const deletePlanByDelReason_API = (id: number, delReason: string) => request.delete(`${basic_path}/delete_description/${id}/${delReason}`)
export const deletePlanList_API = (idList: number[], delReason: string) => request.delete(`${basic_path}/delete_multi/${idList}/${delReason}`)
export const updatePlan_API = (id: number, data: any) => request.patch(`${basic_path}/${id}`, data)
export const getPlanAll_API = () => request.get<PlanData[]>(`${basic_path}`)
export const getPlan_API = (type: string) => request.get(`${basic_path}/${type}`)
export const getPlanListByCondition_API = (waterArea?: string, waterPriceType?: string) => request.get(`${basic_path}/findByCondition?waterArea=${waterArea ? waterArea : ''}&waterPriceType=${waterPriceType ? waterPriceType : ''}`)
//
export const getAllWaterLink_API = () => request.get<WaterLinkData[]>(`${basic_path1}`);
export const deleteWaterLink_API = (id: any) => request.delete(`${basic_path1}/${id}`);
export const createWaterLink_API = (data: any) => request.post<WaterLink>(`${basic_path1}`, data)
