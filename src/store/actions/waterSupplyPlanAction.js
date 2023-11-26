import { GET_WATER_DATA, GET_WATER_PRICE, UPDATE_WATER_DATA, UPDATE_WATER_PRICE } from "../actionTypes/waterSupplyPlanActionType"

const waterSupplyPlanAction = {
	getWaterPrice(payLoad) {
		return {
			type: GET_WATER_PRICE,
			payLoad
		}
	},
	getWaterData(payLoad) {
		return {
			type: GET_WATER_DATA,
			payLoad
		}
	},
	updateWaterPrice(payLoad) {
		return {
			type: UPDATE_WATER_PRICE,
			payLoad
		}
	},
	updateWaterData(payLoad) {
		return {
			type: UPDATE_WATER_DATA,
			payLoad
		}
	}
}

export default waterSupplyPlanAction