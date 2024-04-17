import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import Login from './pages/Login/Login';
import Layout from './pages/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Plan from './pages/Plan/Plan'
import Water from './pages/Water/Water'
import Storage from './pages/Storage/Storage'
import Quality from './pages/Quality/Quality'
import Price from './pages/Plan/Price';
import Center from './pages/Center/Center';
import User from './pages/User/User';
import AuthMiddleware from './Components/AuthMiddleware'
import NotFound from './pages/Error/NotFound';
import WaterType from './pages/Water/WaterType';
import Notifice from './pages/Notifice/Notifice';
import SocketClient from './Components/SocketClient';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <AuthMiddleware>
              <Layout />
            </AuthMiddleware>
          } >
            <Route path="/water_plan" element={<Plan />} />
            <Route path="/water_price" element={<Price />} />
            <Route path="/water_resource" element={<Water />} />
            <Route path="/water_type" element={<WaterType />} />
            <Route path="/water_storage" element={<Storage />} />
            <Route path="/water_quality" element={<Quality />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user_manage" element={<User />} />
            <Route path="/user_center" element={<Center />} />
            <Route path="/user_center/:userId" element={<Center />} />
            <Route path="/notice" element={<Notifice />} />
            <Route path="/" element={<Dashboard />} />
          </Route>
          <Route path="/error/404" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <SocketClient />
    </>
  );
}

export default App;
