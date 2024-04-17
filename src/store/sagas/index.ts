import { all } from 'redux-saga/effects'
import { userSagas } from './userSagas'
import userListSagas from './userListSagas';
import waterTypeSagas from './waterTypeSagas';
import waterSagas from './waterSagas';
import planSagas from './planSagas';
import waterQualitySagas from './waterQualitySagas';
import waterStorageSagas from './waterStorageSagas';
import waterPriceSagas from './waterPriceSagas';
import noticeSagas from './noticeSagas';

function* watchSaga() {
  yield all([
    userSagas(), 
    userListSagas(), 
    waterTypeSagas(), 
    waterSagas(), 
    planSagas(),
    waterQualitySagas(),
    waterStorageSagas(),
    waterPriceSagas(),
    noticeSagas()
  ])
}

export default watchSaga;