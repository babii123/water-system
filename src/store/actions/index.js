import userAction from "./userAction";
import waterSupplyPlanAction from "./waterSupplyPlanAction";

const actions = {
      ...userAction,
      ...waterSupplyPlanAction,
}

export default actions;