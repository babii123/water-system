import requests from ".";
import { UserInfo } from "../model/userInfoModel";

const basic_path = '/auth'
const basic_path1 = '/user'

export const verifyLogin = (userId: string) => requests.get<string[]>(`${basic_path}/verify_login_status/${userId}`)
export const createUser_API = (user: any) => requests.post(`${basic_path}/sign-up`, user)
export const getBasicInfo = (userId: string) => requests.get<UserInfo>(`${basic_path1}/${userId}`)
export const getUserAll_API = () => requests.get<UserInfo[]>(`${basic_path1}`)
export const updateUser_API = (user: any, userId: string) => requests.patch(`${basic_path1}/${userId}`, user)
export const deleteUser_API = (userId: string) => requests.delete(`${basic_path1}/${userId}`)
export const deleteUserList_API = (idList: number[]) => requests.delete(`${basic_path1}/delete_multi/${idList}`)
export const getUserListByCondition_API = (email?: string, realName?: string, phone?: string) => requests.get<UserInfo[]>(`${basic_path1}/findByCondition?email=${email}&realName=${realName}&phone=${phone}`,) 