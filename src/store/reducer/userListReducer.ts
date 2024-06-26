import { UserTableType } from "../../model/userInfoModel"
import { ActionModel } from "../../model/globalModel"
import { DELETE_USER, UPDATE_USER_LIST } from "../actionTypes/actionTypes"

const defaultState: {
  userList?: UserTableType[]
} = {
  userList: undefined
}

export const userListReducer = (state = defaultState, action: ActionModel) => {
  switch (action.type) {
    case DELETE_USER:
      return state
    case UPDATE_USER_LIST:
      return {
        ...state,
        userList: action.payLoad
      }
    default:
      return state
  }
}