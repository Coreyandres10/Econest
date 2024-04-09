import React, { useState } from 'react';
import '../HomeFunctionsStyling/StockBuyInput.css';
import axios from 'axios'
function StockBuyInput() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [shares, setShares] = useState('');

  const handleStockSymbolChange = (e) => {
    setStockSymbol(e.target.value);
  };

  const handleBuyPriceChange = (e) => {
    setBuyPrice(e.target.value);
  };

  const handleSharesChange = (e) => {
    setShares(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let response=await axios.post(`http://localhost:3001/insert-stock`,{stock_symbol:stockSymbol,buy_price:buyPrice,shares:shares})
if(response.status==200){
  alert("Sucessfully inserted")
setStockSymbol("")
setBuyPrice("")
setShares("")
}
if(response.status!==200){
  alert("Server error please try again")
}
  };

  return (
    <div className="stock-buy-input"> 
      <h2 className="input-heading">Stock Buy Input</h2>
      <form onSubmit={handleSubmit} className="input-form"> 
        <div className="input-group"> 
          <label htmlFor="stockSymbol" className="input-label">Stock Symbol:</label> 
          <input
            type="text"
            id="stockSymbol"
            value={stockSymbol}
            onChange={handleStockSymbolChange}
            className="input-text" 
            required
          />
        </div>
        <div className="input-group"> 
          <label htmlFor="buyPrice" className="input-label">Buy Price:</label> 
          <input
            type="number"
            id="buyPrice"
            value={buyPrice}
            onChange={handleBuyPriceChange}
            className="input-text" 
            required
          />
        </div>
        <div className="input-group"> 
          <label htmlFor="shares" className="input-label">Shares:</label> 
          <input
            type="text"
            id="shares"
            value={shares}
            onChange={handleSharesChange}
            className="input-text" 
            required
          />
        </div>
        <button type="submit" className="input-button">Submit</button> 
      </form>
    </div>
  );
  
}

export default StockBuyInput;