/**
 * @description 用户管理列表
 */

import { UserListDataType } from "../../model/userInfoModel"
import { UPDATE_USER_LIST, GET_USER_LIST_BYAPI, DELETE_USER, DELETE_USER_LIST, CREATE_USER, UPDATE_USER } from "../actionTypes/userListActionTypes"

export const getUserListByAPI = () => {
  return {
    type: GET_USER_LIST_BYAPI,
    payLoad: undefined
  }
}

export const updateUser = (updateUserInfo: any, userId: string) => {
  return {
    type: UPDATE_USER,
    updateUserInfo,
    userId
  }
}

export const createUser = (userInfo: any) => {
  return {
    type: CREATE_USER,
    userInfo
  }
}

export const updateUserList = (userList: UserListDataType[]) => {
  return {
    type: UPDATE_USER_LIST,
    payLoad: userList
  }
}

export const deleteUser = (userId: string) => {
  return {
    type: DELETE_USER,
    userId
  }
}

export const deleteUserList = (idList: any) => {
  return {
    type: DELETE_USER_LIST,
    idList
  }
}