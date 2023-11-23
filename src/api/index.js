import requests from "./requests";

// data属性是对应body
// 用户登录
export const userLogin = (data) => requests({ url: '/user/login', method: 'post', data })
// 获取水价消息
export const getWaterPrice = () => requests({ url: '/supply-plan/get_water_price_all', method: 'get'})
// 获取水量信息
export const getWaterData = () => requests({ url: '/supply-plan/get_water_data_all', method: 'get' })