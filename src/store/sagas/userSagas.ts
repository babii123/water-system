import { call, put, takeEvery } from "redux-saga/effects";
import { UPDATE_USER_INFO_TO_SERVER } from "../actionTypes/actionTypes";
import { updateUser_API } from "../../services/userRequest";
import { updateUserInfo } from "../actions/userActions";

function* updateUserinfoToServer(action: any) {
  const { userInfo } = action
  const { code, data } = yield call(updateUser_API, userInfo, userInfo.userId)
  yield put(updateUserInfo(userInfo))
}

export function* userSagas() {
  yield takeEvery(UPDATE_USER_INFO_TO_SERVER, updateUserinfoToServer)
}