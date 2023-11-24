import React from 'react';
import { Route } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Dashboard from './Dashboard'
import WaterSupplyPlan from './WaterSupplyPlan'
// import NotFound from './NotFound';

class LayOut extends React.Component {
      render() {
            return (
                  <div className='container'>
                        <div className='sideBar'>
                              <SideBar />
                        </div>
                        <div className='content'>
                              <Route path="/" exact component={WaterSupplyPlan} />
                              <Route path="/dash" component={Dashboard} />
                        </div>
                  </div>
            )
      }
};
export default LayOut;