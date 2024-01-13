import request from '.'
import { WaterPriceData } from '../model/waterPriceModel'

const basic_path = '/water-price'
interface waterPrice {
  type: string;
  basicPrice: number;
  resourceCost: number;
  pollutionCost: number;
  realPrice: number;
}

export const getWaterPriceAll_API = () => request.get<WaterPriceData[]>(`${basic_path}`)
