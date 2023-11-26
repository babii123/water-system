import React from 'react';
import '../styles/login.css'
import LoginImg from '../assets/login-image.png'
import LoginForm from '../components/LoginForm';

class Login extends React.Component {
	render() {
		return (
			<div className='login-container'>
				<div className='login-left'>
					<img src={LoginImg} alt='login_page'/>
				</div>
				<div className='login-right'>
					<LoginForm />
				</div>
			</div>
		)
	}
}

export default Login;