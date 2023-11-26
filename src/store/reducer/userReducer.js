import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../actionTypes/userActionType";
import states from '../state'

export const userReducer = (state = { userInfo: states.userInfo }, action) => {
	switch (action.type) {
		case LOGIN:
			return state;
		case LOGOUT:
			console.log('logout');
			state.age += 1;
			return state;
		case LOGIN_SUCCESS: {
			// 保存用户信息
			console.log('登录成功', action.payLoad);
			localStorage.setItem('userId', action.payLoad.userId);
			return action.payLoad;
		}
		case LOGIN_FAIL: {
			// 跳转失败页面
			console.log('登录失败');
			return state;
		}
		default:
			return state;
	}
}