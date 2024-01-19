import request from '.'
// 获取用户总数数量
// 获取各个角色数量
// 获取admin列表
export interface userResultModel {
  allCount: number
  adminCount: number
  engineerCount: number
  searcherCount: number
  adminList: []
}

export interface waterPriceResultModel {
  realPrices: {
    [key: string]: number
  }
  basicPrices: {
    [key: string]: number
  }
  pollutionCosts: {
    [key: string]: number
  }
  resourceCosts: {
    [key: string]: number
  }
}
export const getUserDashboard = () => request.get<userResultModel>('/user/getUser_dashboard')
// 获取水价
export const getWaterPriceDashboard = () => request.get<waterPriceResultModel>('/water-price/getWaterPrice_dashboard')
// 获取供水计划数量
export const getPlanDashboard = () => request.get<number>('/supply-plan/getPlan_dashboard')
// 获取水资源数量
export const getWaterDashboard = () => request.get<number>('/water/getWater_dashboard')