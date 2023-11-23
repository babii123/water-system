import { GET_WATER_DATA, GET_WATER_PRICE, UPDATE_WATER_PRICE, UPDATE_WATER_DATA } from "../actionTypes/waterSupplyPlanActionType";
import _state from '../state'

export const waterSupplyPlanReducer = (state = _state, action) => {
      switch (action.type) {
            case GET_WATER_PRICE:
                  return Object.assign({}, state, action);
            case GET_WATER_DATA:
                  return Object.assign({}, state, action);
            case UPDATE_WATER_PRICE: {
                  state.waterPrice = action.payLoad;
                  return state;
            }
            case UPDATE_WATER_DATA: {
                  // return {
                  //       ...state,
                  //       waterData: [...state.waterData, 1, 2, 3]
                  // }
                  console.log("进入更新");
                  state.userInfo.userName = "123"
                  state.waterPrice.one = '1'
                  state.waterData = action.payLoad
                  return state
                  // state.waterData = [...action.payLoad];
            }
            default:
                  return state;
      }

}