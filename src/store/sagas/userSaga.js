import { call, put, select, takeLatest } from 'redux-saga/effects'
import { userLogin } from '../../api';
import { LOGIN, LOGIN_FAIL, LOGIN_SUCCESS } from '../actionTypes/userActionType';

function* userSaga() {
      yield takeLatest(LOGIN, function* () {
            const info = yield select(state => state.userReducer.payLoad);
            console.log("userSaga", info);
            const res = yield call(userLogin, info);
            if (res.code === 200) {
                  yield put({
                        type: LOGIN_SUCCESS,
                        payLoad: res
                  })
            }else{
                  yield put({
                        type: LOGIN_FAIL,
                        payLoad: res
                  })
            }
            
      })
}

export default userSaga;