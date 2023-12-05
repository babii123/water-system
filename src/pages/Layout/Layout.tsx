import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css'
import SideBar from './components/SideBar';
import Header from './components/Header';
import { connect } from 'react-redux';

const LayOut = (props: {}) => {

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      // props.history.replace('/login')
      // console.log('sss', props.userInfo.userId);
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