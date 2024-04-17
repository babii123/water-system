import { ActionModel } from "../../model/globalModel"
import { NoticeListModel } from "../../model/tableModel"
import { UPDATE_NOTICE_LIST } from "../actionTypes/actionTypes"

const defaultState: {
  noticeList: NoticeListModel[]
} = {
  noticeList: []
}

export const noticeReducer = (state = defaultState, action: ActionModel) => {
  switch (action.type) {
    case UPDATE_NOTICE_LIST:
      return {
        ...state,
        noticeList: action.payLoad
      }
    default:
      return state
  }
}