import LoginImg from '../../assets/login-image.png'
import LoginForm from './components/LoginForm';
import './Login.css'
import { useTranslation } from 'react-i18next';

function Login() {
  const { t } = useTranslation();
  return (
    <div className='login-container'>
      <div className='login-left'>
        <img src={LoginImg} alt='login_page' />
      </div>
      <div className='login-right'>
        <div className='login-title'>
          {t('Water Resources Management System')}
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;