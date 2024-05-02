import React, { useState } from 'react';
import Stocks from './Stocks/Stocks'; 
import StockBuyInput from './Stocks/StockBuyInput'; 

// Component for managing stock-related functionalities
function StocksMain() {
  const [activeTab, setActiveTab] = useState('buyStock'); 

  // Function to change active tab
  const changeTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <button
        className={activeTab === 'buyStock' ? 'tab-btn active' : 'tab-btn'}
        onClick={() => changeTab('buyStock')}
      >
        Stock Tracker
      </button>
      <button
        className={activeTab === 'stocks' ? 'tab-btn active' : 'tab-btn'}
        onClick={() => changeTab('stocks')}
      >
        Stock News
      </button>
      {/* Render StockBuyInput component if activeTab is 'buyStock' */}
      {activeTab === 'buyStock' && <StockBuyInput />}
      {/* Render Stocks component if activeTab is 'stocks' */}
      {activeTab === 'stocks' && <Stocks />}
    </div>
  );
}

export default StocksMain;
