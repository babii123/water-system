import request from '.'
import { PlanData } from '../model/planModel'

const basic_path = '/supply-plan'
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

export const createPlan_API = (data: Plan) => request.post<PlanData>(`${basic_path}`, data)
export const deletePlan_API = (id: number) => request.delete(`${basic_path}/${id}`)
export const deletePlanByDelReason_API = (id: number, delReason: string) => request.delete(`${basic_path}/delete_description/${id}/${delReason}`)
export const deletePlanList_API = (idList: number[]) => request.delete(`${basic_path}/delete_multi/${idList}`)
export const updatePlan_API = (id: number, data: Plan) => request.patch(`${basic_path}/${id}`, data)
export const getPlanAll_API = () => request.get<PlanData[]>(`${basic_path}`)
export const getPlan_API = (type: string) => request.get(`${basic_path}/${type}`)
