/**
 * @description 水资源类型管理列表
 */

import { NoticeListModel } from "../../model/tableModel"
import {
  DELETE_NOTICE,
  GET_NOTICE_LIST_BYAPI,
  UPDATE_NOTICE,
  UPDATE_NOTICE_LIST
} from "../actionTypes/actionTypes"


export const getNoticeListByAPI = () => {
  return {
    type: GET_NOTICE_LIST_BYAPI
  }
}

export const updateNoticeList = (noticeList: NoticeListModel[]) => {
  return {
    type: UPDATE_NOTICE_LIST,
    payLoad: noticeList
  }
}

export const deleteNotice = (id: number) => {
  return {
    type: DELETE_NOTICE,
    id
  }
}

export const updateNotice = (id: number) => {
  return {
    type: UPDATE_NOTICE,
    id
  }
}