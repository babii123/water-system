import LoginImg from '../../assets/login-image.png'
import LoginForm from './components/LoginForm';
import './Login.css'

function Login() {
  return (
    <div className='login-container'>
      <div className='login-left'>
        <img src={LoginImg} alt='login_page' />
      </div>
      <div className='login-right'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;