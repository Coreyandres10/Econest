import React, { useState } from 'react';
import Dashboard from '../HomeFunctions/Dashboard'; 
import Income from '../HomeFunctions/Income'; 
import Expenses from '../HomeFunctions/Expenses'; 
import StocksMain from '../HomeFunctions/StocksMain'; 
import CSV from '../HomeFunctions/CSV'; 
import './Home.css'; 
import CompanyLogo from '../Pictures/EconestPng.png'; 
import AvatarIcon from '../Pictures/Avatar.jpeg'; 

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
      <header className="home-header">
        {/* Welcome box */}
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
          Home
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
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'income' && <Income />}
        {activeTab === 'expenses' && <Expenses />}
        {activeTab === 'stocksMain' && <StocksMain />}
        {activeTab === 'csvUpload' && <CSV />}
      </div>
    </div>
  );
}

export default Home;
