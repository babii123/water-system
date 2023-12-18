import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { userListReducer } from "./userListReducer";
import { waterTypeReducer } from "./waterTypeReducer";
import { waterReducer } from "./waterReducer";

const reducer = combineReducers(
  {
    userInfo: userReducer,
    userListReducer,
    waterType: waterTypeReducer,
    water: waterReducer
  }
)
export default reducer;