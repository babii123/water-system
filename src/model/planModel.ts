// Table Data
export interface PlanTableType {
  key?: number
  id: number
  addTime: Date | any
  startTime: Date | any
  endTime: Date | any
  waterSources: string[]
  waterArea: string
  waterPriceType: string
  description: string
  addUser: string
  isDel: boolean
  delReason: string
}
// Create
export interface PlanData {
  id: number
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

export interface WaterLinkData {
  id: number;
  title: string;
  link: string;
}