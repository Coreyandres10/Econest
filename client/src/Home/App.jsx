import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../LoginPage/Signup';
import Login from '../LoginPage/Login';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Chart from 'chart.js/auto';

function App() {
  useEffect(() => {
    Chart.register(
      {
        id: 'pie',
        element: 'pie',
        elementType: 'arc',
        labels: ['Pie']
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
