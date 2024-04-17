export interface WaterQualityTableType {
  key?: number
  id: number
  resourceId: number
  addTime?: Date
  addUser?: string
  detectTime?: Date
  detectPeople?: string[]
  ph?: number
  turbidity?: number
  fluoride?: number
  cyanin?: number
  isDel?: boolean
  delReason?: string
}

export interface WaterQualityData {
  id: number
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

