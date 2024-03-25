import React, { useState } from 'react';
import Dashboard from './HomeFunctions/Dashboard';
import Income from './HomeFunctions/Income';
import Expenses from './HomeFunctions/Expenses';
import Stocks from './HomeFunctions/Stocks';
import CSV from './HomeFunctions/CSV'; // Import the component for CSV upload
import './Home.css';
import CompanyLogo from './Pictures/EconestPng.png';
import AvatarIcon from './Pictures/Avatar.jpeg'; // Import the avatar picture

function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="welcome-box">
          <img src={AvatarIcon} alt="Avatar" className="avatar" />
          <span className="welcome-text">Welcome Back!</span>
        </div>
        <img src={CompanyLogo} alt="Company Logo" className="company-logo" />
      </header>

      <div className="tab-container">
        <button
          className={activeTab === 'dashboard' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={activeTab === 'income' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('income')}
        >
          Income
        </button>
        <button
          className={activeTab === 'expenses' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('expenses')}
        >
          Expenses
        </button>
        <button
          className={activeTab === 'stocks' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('stocks')}
        >
          Stock News
        </button>
        {/* Add the button for the .csv upload tab */}
        <button
          className={activeTab === 'csvUpload' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('csvUpload')}
        >
          .csv Upload
        </button>
      </div>

      <div className="tab-content">
        {/* Render content based on activeTab */}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'income' && <Income />}
        {activeTab === 'expenses' && <Expenses />}
        {activeTab === 'stocks' && <Stocks />}
        {/* Add the content for the .csv upload tab */}
        {activeTab === 'csvUpload' && <CSV />}
      </div>
    </div>
  );
}

export default Home;
