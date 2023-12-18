import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css'
import SideBar from './components/SideBar';
import Header from './components/Header';
import { connect, useDispatch } from 'react-redux';
import { getBasicInfo } from '../../services/userRequest';
import { updateUserInfo } from '../../store/actions/userActions';
import { UserInfo } from '../../model/userInfoModel';

const LayOut = (props: {}) => {
  const dispatch = useDispatch()

  const _updateUserInfo = (userInfo: UserInfo) => {
    dispatch(updateUserInfo(userInfo))
  }

  useEffect(() => {
    // 获取用户数据
    if (localStorage.getItem('userId')) {
      getBasicInfo(localStorage.getItem('userId') || '').then(res => {
        _updateUserInfo(res.data)
      })
    }
  }, [])

  return (
    <>
      <div className='sideBar'>
        <SideBar />
      </div>
      <div className='main-container'>
        <div className="header">
          <Header />
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </>
  )
};

export default connect(
  // (state) => {
  //   return {
  //     userInfo: state.userInfo
  //   }
  // }
)(LayOut);