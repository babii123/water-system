import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { userListReducer } from "./userListReducer";
import { waterTypeReducer } from "./waterTypeReducer";
import { waterReducer } from "./waterReducer";
import { planReducer } from "./planReducer";
import { waterQualityReducer } from './waterQualityReducer'
import { waterStorageReducer } from "./waterStorageReducer";
import { waterPriceReducer } from "./waterPriceReducer";

const reducer = combineReducers(
  {
    userInfo: userReducer,
    userListReducer,
    waterType: waterTypeReducer,
    water: waterReducer,
    plan: planReducer,
    waterQuality: waterQualityReducer,
    waterStorage: waterStorageReducer,
    waterPrice: waterPriceReducer
  }
)
export default reducer;