import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login';
import LayOut from './pages/Layout';
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound';
import WaterSupplyPlan from './pages/WaterSupplyPlan'
// import Message from './components/Message'
// import PrivateRoute from './components/PrivateRoute';

class App extends React.Component {
  render() {
    return (
      <Routes>
        {/* 
        重定向拦截失败
        */}
        {/* <Route path="/" element={<PrivateRoute requiredRoles={[]} children={<LayOut />} />}>
          <Route path="/" element={<Message />} />
        </Route> */}
        <Route path="/" element={<LayOut />}>
          <Route path="/" element={<WaterSupplyPlan />} />
          <Route path="/dash" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
      </Routes>
    )
  }
}

export default App;