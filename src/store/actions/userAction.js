import { LOGIN } from "../actionTypes/userActionType";

const userAction = {
	login(payLoad) {
		return {
			type: LOGIN,
			payLoad
		}
	},
	logOut(payLoad) {
		return {
			type: 'logOut',
			payLoad
		}
	},
}

export default userAction;