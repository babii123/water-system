import { combineReducers } from "redux";
import { userReducer } from './userReducer'
import { waterSupplyPlanReducer } from "./waterSupplyPlanReducer";
const reducer = combineReducers(
      {
            userReducer,
            waterSupplyPlanReducer,
      }
)
export default reducer