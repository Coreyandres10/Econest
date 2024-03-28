import React, { useState } from 'react';
import Stocks from './Stocks/Stocks';
import StockBuyInput from './Stocks/StockBuyInput';


function StocksMain() {
  const [activeTab, setActiveTab] = useState('buyStock');

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
      {activeTab === 'buyStock' && <StockBuyInput />}
      {activeTab === 'stocks' && <Stocks />}
    </div>
  );
}

export default StocksMain;
