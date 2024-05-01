import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from '../LoginPage/Signup'; // Importing Signup component
import Login from '../LoginPage/Login'; // Importing Login component
import Home from './Home'; // Importing Home component
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS
import Chart from 'chart.js/auto'; // Importing Chart.js library

function App() {
  // useEffect hook to register a custom Chart.js chart type when the component mounts
  useEffect(() => {
    Chart.register(
      {
        id: 'pie', // Unique identifier for the custom chart type
        element: 'pie', // HTML element type for rendering the chart
        elementType: 'arc', // Type of elements in the chart (e.g., 'arc' for pie chart segments)
        labels: ['Pie'] // Labels for the custom chart type (optional)
      }
    );
  }, []);

  // Rendering component
  return (
    // BrowserRouter component for handling client-side routing
    <BrowserRouter>
      {/* Routes component for defining routes */}
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

// Exporting the App component
export default App;

