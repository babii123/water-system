import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css'
import SideBar from './components/SideBar';
import Header from './components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getBasicInfo } from '../../services/userRequest';
import { updateUserInfo } from '../../store/actions/userActions';
import { UserInfo } from '../../model/userInfoModel';
import { getNoticeListByAPI } from '../../store/actions/noticeAction';

const LayOut = () => {
  const noticeList = useSelector((state: any) => {
    return state.notice.noticeList;
  })
  const dispatch = useDispatch()
  const _updateUserInfo = (userInfo: UserInfo) => {
    dispatch(updateUserInfo(userInfo))
  }
  const _getNoticeListByAPI = () => {
    dispatch(getNoticeListByAPI())
  }

  useEffect(() => {
    // 获取用户数据
    if (localStorage.getItem('userId')) {
      getBasicInfo(localStorage.getItem('userId') || '').then(res => {
        _updateUserInfo(res.data)
      })
      // 获取通知消息
      _getNoticeListByAPI();
    }
  }, [])

  return (
    <>
      <div className='sideBar'>
        <SideBar />
      </div>
      <div className='main-container'>
        <div className="header">
          <Header noticeList={noticeList} />
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    </>
  )
};

export default LayOut;