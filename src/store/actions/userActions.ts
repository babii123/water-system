/**
 * @description 个人信息
 */
import { UserInfo } from "../../model/userInfoModel"
import { CHANGE_MENU_ITEMS, SET_ROLES, UPDATE_USER_INFO, GET_USER_INFO, UPDATE_USER_INFO_TO_SERVER } from "../actionTypes/userActionTypes"

export enum UserRole {
  ADMIN = "admin",
  ENGINEER = "engineer",
  SEARCHER = "searcher",
}

// 设置roles
export const setRoles = (roles: Array<string>) => {
  return {
    type: SET_ROLES,
    payLoad: roles
  }
}

// 修改侧边栏
export const changeMenuItems = (menuItems: Array<string>) => {
  return {
    type: CHANGE_MENU_ITEMS,
    payLoad: menuItems
  }
}

// 设置用户基础信息
export const updateUserInfo = (userInfo: UserInfo) => {
  return {
    type: UPDATE_USER_INFO,
    payLoad: userInfo
  }
}

export const updateUserInfoToServer = (userInfo: UserInfo) => {
  return {
    type: UPDATE_USER_INFO_TO_SERVER,
    userInfo
  }
}

// export const getUserInfo = () => {
//   return {
//     type: GET_USER_INFO
//   }
// }