import { all } from 'redux-saga/effects'
import { userSagas } from './userSagas'
import userListSagas from './userListSagas';
import waterTypeSagas from './waterTypeSagas';
import waterSagas from './waterSagas';

function* watchSaga() {
  yield all([userSagas(), userListSagas(), waterTypeSagas(),waterSagas()])
}

export default watchSaga;