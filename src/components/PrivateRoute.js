import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { state } from '../store';
import Login from '../pages/Login';

class PrivateRoute extends React.Component {
	constructor({ children, requiredRoles }) {
		super();
		this.state = {
			currentUser: '',
			// currentUser: state.userInfo,
			requiredRoles: requiredRoles,
			children: children
		}
	}

	componentDidMount() {
		// 用户未登录
		if (!this.state.currentUser) {
			console.log("用户未登录");
			this.setState({
				...this.state,
				children: <Login />
			})
		}

		// 角色不满足权限
		if (!this.state.requiredRoles.includes(this.state.currentUser.role)) {
			console.log("角色不满足权限");

			this.setState({
				...this.state,
				// children: <Navigate to="/404" />
			})
		}
	}
	render() {
		return this.children
	}

}

export default PrivateRoute;
