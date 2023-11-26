import { combineReducers } from "redux";
import { userReducer } from './userReducer'
import { waterSupplyPlanReducer } from "./waterSupplyPlanReducer";
const reducer = combineReducers(
	{
		userInfo: userReducer,
		water: waterSupplyPlanReducer,
	}
)
export default reducer;