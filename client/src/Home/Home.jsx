import React, { useState } from 'react';
import Dashboard from '../HomeFunctions/Dashboard'; // Importing Dashboard component
import Income from '../HomeFunctions/Income'; // Importing Income component
import Expenses from '../HomeFunctions/Expenses'; // Importing Expenses component
import StocksMain from '../HomeFunctions/StocksMain'; // Importing StocksMain component
import CSV from '../HomeFunctions/CSV'; // Importing CSV component
import './Home.css'; // Importing CSS file for styling
import CompanyLogo from '../Pictures/EconestPng.png'; // Importing Company Logo image
import AvatarIcon from '../Pictures/Avatar.jpeg'; // Importing Avatar Icon image

function Home() {
  // State to manage active tab
  const [activeTab, setActiveTab] = useState('dashboard');

  // Function to change active tab
  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  // Rendering component
  return (
    <div className="home-container">
      {/* Header section */}
      <header className="home-header">
        {/* Welcome box with avatar icon */}
        <div className="welcome-box">
          <img src={AvatarIcon} alt="Avatar" className="avatar" />
          <span className="welcome-text">Welcome Back!</span>
        </div>
        {/* Company logo */}
        <img src={CompanyLogo} alt="Company Logo" className="company-logo" />
      </header>

      {/* Tab navigation section */}
      <div className="tab-container">
        {/* Button for Dashboard tab */}
        <button
          className={activeTab === 'dashboard' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('dashboard')}
        >
          Dashboard
        </button>
        {/* Button for Income tab */}
        <button
          className={activeTab === 'income' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('income')}
        >
          Income
        </button>
        {/* Button for Expenses tab */}
        <button
          className={activeTab === 'expenses' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('expenses')}
        >
          Expenses
        </button>
        {/* Button for Stocks tab */}
        <button
          className={activeTab === 'stocksMain' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('stocksMain')}
        >
          Stocks
        </button>
        {/* Button for CSV Upload tab */}
        <button
          className={activeTab === 'csvUpload' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('csvUpload')}
        >
          .csv Upload
        </button>
      </div>

      {/* Tab content section */}
      <div className="tab-content">
        {/* Rendering Dashboard component if activeTab is 'dashboard' */}
        {activeTab === 'dashboard' && <Dashboard />}
        {/* Rendering Income component if activeTab is 'income' */}
        {activeTab === 'income' && <Income />}
        {/* Rendering Expenses component if activeTab is 'expenses' */}
        {activeTab === 'expenses' && <Expenses />}
        {/* Rendering StocksMain component if activeTab is 'stocksMain' */}
        {activeTab === 'stocksMain' && <StocksMain />}
        {/* Rendering CSV component if activeTab is 'csvUpload' */}
        {activeTab === 'csvUpload' && <CSV />}
      </div>
    </div>
  );
}

// Exporting the Home component
export default Home;
