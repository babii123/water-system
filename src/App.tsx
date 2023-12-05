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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />} >
          <Route path="/water_plan" element={<Plan />} />
          <Route path="/water_price" element={<Price />} />
          <Route path="/water_type" element={<Water />} />
          <Route path="/water_storage" element={<Storage />} />
          <Route path="/water_quality" element={<Quality />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
