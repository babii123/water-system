import { UserInfo } from "../../model/userInfoModel"
import { CHANGE_MENU_ITEMS, UPDATE_USER_INFO, SET_ROLES } from "../actionTypes/userActionTypes"

export enum UserRole {
  ADMIN = "admin",
  ENGINEER = "engineer",
  SEARCHER = "searcher",
}

const defaultState:
  {
    userInfo: UserInfo,
    roles: Array<UserRole>,
    menuItems: Array<string>,
  }
  = {
  userInfo: {
    id: 0,
    userId: '',
    realName: '',
    accountName: '',
    email: '',
    phone: '',
    sex: 1,
    birthday: undefined,
    roles: []
  },
  // 权限
  roles: [],
  // 侧边栏数据
  menuItems: ['dashboard', 'user_manage', 'user_center', 'water_plan/', 'water_plan', 'water_price', 'water_resource/', 'water_resource', 'water_type', 'water_storage', 'water_quality']
}

export const userReducer = (state = defaultState, action: { type: string, payLoad: any }) => {
  switch (action.type) {
    case SET_ROLES:
      return {
        ...state,
        roles: action.payLoad
      }
    case CHANGE_MENU_ITEMS:
      return {
        ...state,
        menuItems: action.payLoad
      }
    case UPDATE_USER_INFO:
      return {
        ...state,
        userInfo: action.payLoad
      }
    default:
      return state
  }
}