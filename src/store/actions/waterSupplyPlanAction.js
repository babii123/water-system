import store from ".."
import { GET_WATER_DATA, GET_WATER_PRICE, UPDATE_WATER_DATA, UPDATE_WATER_PRICE } from "../actionTypes/waterSupplyPlanActionType"

const waterSupplyPlanAction = {
      getWaterPrice() {
            store.dispatch({
                  type: GET_WATER_PRICE,
                  payLoad: ''
            })
      },
      getWaterData() {
            store.dispatch({
                  type: GET_WATER_DATA,
                  payLoad: ''
            })
      },
      updateWaterPrice(payLoad) {
            store.dispatch({
                  type: UPDATE_WATER_PRICE,
                  payLoad
            })
      },
      updateWaterData(payLoad) {
            store.dispatch({
                  type: UPDATE_WATER_DATA,
                  payLoad
            })
      }
}

export default waterSupplyPlanAction