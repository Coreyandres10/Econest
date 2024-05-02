import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../LoginPage/Signup'; 
import Login from '../LoginPage/Login'; 
import Home from './Home'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Chart from 'chart.js/auto'; 

function App() {
  // useEffect hook to register a custom Chart.js chart type when the component mounts
  useEffect(() => {
    Chart.register(
      {
        id: 'pie', // ID for the custom chart type
        element: 'pie', // HTML element type for rendering the chart
        elementType: 'arc', 
        labels: ['Pie'] 
      }
    );
  }, []);

  // Rendering component
  return (
    // BrowserRouter component for handling client-side routing
    <BrowserRouter>
      <Routes>
        {/* Route for the Signup component */}
        <Route path='/register' element={<Signup />} />
        {/* Route for the Login component */}
        <Route path='/login' element={<Login />} />
        {/* Route for the Home component */}
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

