import { UserInfo } from "../../model/userInfoModel"
import { CHANGE_MENU_ITEMS, UPDATE_USERINFO, SET_ROLES } from "../actionTypes/userActionTypes"

export enum UserRole {
  ADMIN = "admin",
  ENGINEER = "engineer",
  SEARCHER = "searcher",
}

const defaultState:
  {
    userInfo: UserInfo,
    roles: Array<UserRole>,
    count: number
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
  count: 1,
  // 侧边栏数据
  menuItems: ['dashboard', 'user_manage', 'user_center', 'water_plan/', 'water_resource/', '', 'water_type', 'water_storage', 'water_quality']
}

export const userReducer = (state = defaultState, action: { type: string, payLoad: any }) => {
  switch (action.type) {
    case 'update_count':
      console.log('触发', action);
      return {
        ...state,
        count: action.payLoad
      }
    case SET_ROLES:
      return {
        ...state,
        roles: action.payLoad
      }
    case CHANGE_MENU_ITEMS:
      // console.log('111', action.payLoad);
      return {
        ...state,
        menuItems: action.payLoad
      }
    case UPDATE_USERINFO:
      return {
        ...state,
        userInfo: action.payLoad
      }
    default:
      return state
  }
}