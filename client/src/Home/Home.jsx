import React, { useState } from 'react';
import Dashboard from '../HomeFunctions/Dashboard';
import Income from '../HomeFunctions/Income';
import Expenses from '../HomeFunctions/Expenses';
import StocksMain from '../HomeFunctions/StocksMain'; 
import CSV from '../HomeFunctions/CSV';
import './Home.css';
import CompanyLogo from '/Users/emanuel/Econest/client/src/Pictures/EconestPng.png';
import AvatarIcon from '/Users/emanuel/Econest/client/src/Pictures/Avatar.jpeg'; 

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
          className={activeTab === 'stocksMain' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('stocksMain')}
        >
          Stocks
        </button>
        <button
          className={activeTab === 'csvUpload' ? 'tab-btn active' : 'tab-btn'}
          onClick={() => changeTab('csvUpload')}
        >
          .csv Upload
        </button>
      </div>

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
