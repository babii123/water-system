// 水资源类型表格数据类型
export interface WaterTypeTableType {
  key: number
  id: number
  type: string
  description: string
}

export interface WaterType {
  id: number
  type: string
  description: string
}

// 水资源表格数据类型
export interface WaterTableType {
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

// 水量表格数据类型
export interface WaterStorageTableType {
  key?: number
  id: number
  resourceId: number;
  addTime?: Date;
  addUser?: string
  detectTime?: Date;
  detectPeople?: string[];
  supply?: number;
  storage?: number;
  isDel?: boolean;
  delReason?: string;
}

export interface WaterStorageData {
  id: number
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

// 水质表格数据类型
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

// 水价表格数据类型
export interface WaterPriceTableType {
  key: number
  id: number
  type: string
  basicPrice: number
  resourceCost: number
  pollutionCost: number
  realPrice: number
}

export interface WaterPriceData {
  id: number
  type: string
  basicPrice: number
  resourceCost: number
  pollutionCost: number
  realPrice: number
}

// 供水计划表格数据类型
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

export interface NoticeListModel {
  id: number;
  type: string;
  info: string;
  sendId: string;
  receiveId: string;
  time: Date;
  isRead: boolean;
}