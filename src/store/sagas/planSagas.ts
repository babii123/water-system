import { put, call, takeEvery } from "redux-saga/effects"
import { CREATE_PLAN, DELETE_PLAN_LIST, GET_PLAN_LIST_BYAPI, UPDATE_PLAN, DELETE_PLAN_BY_REASON } from "../actionTypes/planActionTypes"
import { createPlan_API, deletePlanByDelReason_API, deletePlanList_API, getPlanAll_API, updatePlan_API } from "../../services/planRequest"
import { PlanData } from "../../model/planModel"
import { updatePlanList } from "../actions/planActions"
import { message } from "antd"

function* _getPlanListByAPI() {
  console.log('xxx');
  const { code, data }: { code: number, data: PlanData[] } = yield call(getPlanAll_API)
  if (code === 200 && data) {
    const new_data = data.map((item) => {
      return { ...item, key: item.id }
    })
    yield put(updatePlanList(new_data))
  }
}

function* _createPlan(action: { type: string, plan: PlanData }) {
  const { code } = yield call(createPlan_API, action.plan)
  if (code === 200) {
    message.success('create success')
    yield call(_getPlanListByAPI)
  } else {
    message.error('create error')
  }
}

function* _updatePlan(action: { type: string, plan: PlanData, id: number }) {
  console.log('plan:', action.plan);
  const { code } = yield call(updatePlan_API, action.id, action.plan)
  if (code === 200) {
    message.success('update success')
    yield call(_getPlanListByAPI)
  } else {
    message.error('update error')
  }
}

function* _deletePlanByReason(action: { type: string, id: number, delReason: string }) {
  const { code } = yield call(deletePlanByDelReason_API, action.id, action.delReason)
  if (code === 200) {
    yield call(_getPlanListByAPI)
    message.success('delete success')
  } else {
    message.error('delete error')
  }
}

function* _deletePlanList(action: { type: string, idList: number[] }) {
  console.log('_deleteList', action.idList);
  const { code } = yield call(deletePlanList_API, action.idList)
  if (code === 200) {
    message.success('delete list success')
    yield call(_getPlanListByAPI)
  } else {
    message.error('delete list error')
  }
}


function* planSagas() {
  yield takeEvery(GET_PLAN_LIST_BYAPI, _getPlanListByAPI)
  yield takeEvery(CREATE_PLAN, _createPlan)
  yield takeEvery(UPDATE_PLAN, _updatePlan)
  yield takeEvery(DELETE_PLAN_BY_REASON, _deletePlanByReason)
  yield takeEvery(DELETE_PLAN_LIST, _deletePlanList)
}

export default planSagas