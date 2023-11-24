import store from "..";
import { LOGIN } from "../actionTypes/userActionType";

const userAction = {
      login(payLoad) {
            store.dispatch(
                  {
                        type: LOGIN,
                        payLoad
                  }
            )
      },
      logOut(payLoad) {
            store.dispatch(
                  {
                        type: 'logOut',
                        payLoad
                  }
            )
      },
      addAge(payLoad){
            store.dispatch(
                  {
                        type: 'addAge',
                        payLoad
                  }
            )
      }
}

export default userAction;