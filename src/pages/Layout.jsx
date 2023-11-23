import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';
// import Dashboard from './Dashboard';
// import NotFound from './NotFound';

class LayOut extends React.Component {
      render() {
            return (
                  <div className='container'>
                        <div className='sideBar'>
                              <SideBar />
                        </div>
                        <div className='content'>
                              <Outlet/>
                        </div>
                  </div>
            )
      }
};
export default LayOut;