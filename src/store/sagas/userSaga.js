import { call, cancel, put, cancelled, take, fork } from 'redux-saga/effects'
import { userLogin } from '../../api';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../actionTypes/userActionType';

/**
 * 登录逻辑
 */
function* authorize(info) {
	try {
		const res = yield call(userLogin, info);
		if (res.code === 200) {
			yield put({ type: LOGIN_SUCCESS, payLoad: res.data });
		}else{
			yield put({ type: LOGIN_FAIL, payLoad: res.message });
		}
		// 保存 token
		// yield call(saveToken, { token })
		return res;
	} catch (error) {
		yield put({ type: LOGIN_FAIL, error });
	} finally {
		if (yield cancelled()) {
			// ... 修改登录状态
			
		}
	}
}

function* userSaga() {
	while (true) {
		const { payLoad } = yield take(LOGIN);
		console.log('loginsaga', payLoad);
		const task = yield fork(authorize, payLoad);
		const action = yield take([LOGOUT, LOGIN_FAIL]);
		if (action.type === LOGOUT) {
			yield cancel(task);
		}
		// 清除token
		// yield call(clearToken())
	}
}

export default userSaga;