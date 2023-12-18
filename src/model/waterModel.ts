// 表格数据类型
export interface WaterDataType {
  key: number
  id: number
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

export interface WaterData {
  id: number
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