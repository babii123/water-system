import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from "../actionTypes/userActionType";
import _state from '../state'

export const userReducer = (state = _state, action) => {
      switch (action.type) {
            case LOGIN:
                  return Object.assign({}, {}, action);
            case 'logOut':
                  console.log('logout');
                  state.age += 1;
                  return state;
            case LOGIN_SUCCESS: {
                  // 保存用户信息
                  return state;
            }
            case LOGIN_FAIL: {
                  // 跳转失败页面
                  break;
            }
            default:
                  return Object.assign({}, state, action);
      }
}