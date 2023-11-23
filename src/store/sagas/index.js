import { all } from 'redux-saga/effects'
import userSaga from './userSaga';
import waterSupplyPlanSaga from './waterSupplyPlanSaga'
function* watchSaga() {
      yield all([userSaga(), waterSupplyPlanSaga(),])
}

export default watchSaga;