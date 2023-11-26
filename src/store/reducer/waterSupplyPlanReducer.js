import { GET_WATER_DATA, GET_WATER_PRICE, UPDATE_WATER_PRICE, UPDATE_WATER_DATA } from "../actionTypes/waterSupplyPlanActionType";
import _state from '../state'

export const waterSupplyPlanReducer = (
	state = {
		waterData: _state.waterData,
		waterPrice: _state.waterPrice
	},
	action
) => {
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
			return { ...state, waterData: action.payLoad };
		}
		default:
			return state;
	}

}