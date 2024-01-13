export interface WaterPriceTableType {
  key: number
  id: number
  type: string
  basicPrice: number
  resourceCost: number
  pollutionCost: number
  realPrice: number
}

export interface WaterPriceData{
  id: number
  type: string
  basicPrice: number
  resourceCost: number
  pollutionCost: number
  realPrice: number
}