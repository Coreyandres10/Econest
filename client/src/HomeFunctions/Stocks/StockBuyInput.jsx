import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../HomeFunctionsStyling/StockBuyInput.css';

function StockBuyInput() {
  const [stockSymbol, setStockSymbol] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [shares, setShares] = useState('');
  const [stocks, setStocks] = useState([]);
  const [editingStockId, setEditingStockId] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-stocks`);
      if (response.data && response.data.response) {
        const fetchedStocks = response.data.response;
        const updatedStocks = await Promise.all(fetchedStocks.map(async (stock) => {
          const { current_price, previous_close } = await fetchStockData(stock.stock_symbol);
          return { ...stock, current_price, previous_close };
        }));
        setStocks(updatedStocks);
      } else {
        console.error("Invalid stock data in API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const fetchStockData = async (symbol) => {
    const url = `https://real-time-finance-data.p.rapidapi.com/stock-quote?symbol=${symbol}&language=en`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd0aecf7196msh1eb73a6c9c9a11ep1f9739jsnbfa2462c3764',
        'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return {
        current_price: result.data.price,
        previous_close: result.data.previous_close
      };
    } catch (error) {
      console.error("Error fetching stock data:", error);
      return { current_price: null, previous_close: null };
    }
  };

  const handleStockSymbolChange = (e) => {
    setStockSymbol(e.target.value);
  };

  const handleBuyPriceChange = (e) => {
    setBuyPrice(e.target.value);
  };

  const handleSharesChange = (e) => {
    setShares(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    console.log("Stock Symbol:", stockSymbol);
    console.log("Buy Price:", buyPrice);
    console.log("Shares:", shares);
    try {
      if (editingStockId) {
        const updateResponse = await axios.put(`http://localhost:3001/update-stock/${editingStockId}`, { stock_symbol: stockSymbol, buy_price: buyPrice, shares: shares });
        if (updateResponse.status === 200) {
          setStockSymbol('');
          setBuyPrice('');
          setShares('');
          setEditingStockId(null);
          fetchStocks();
          alert("Stock updated");
        }
      } else {
        const addResponse = await axios.post(`http://localhost:3001/insert-stock`, { stock_symbol: stockSymbol, buy_price: buyPrice, shares: shares });
        if (addResponse.status === 200) {
          setStockSymbol('');
          setBuyPrice('');
          setShares('');
          fetchStocks();
          alert("Stock added");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Please try again later.");
    }
  };

  const handleEditStock = (stock) => {
    setStockSymbol(stock.stock_symbol);
    setBuyPrice(stock.buy_price);
    setShares(stock.shares);
    setEditingStockId(stock._id);
  };

  const handleDeleteStock = async (stockId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/delete-stock/${stockId}`);
      if (response.status === 200) {
        setStocks(stocks.filter(stock => stock._id !== stockId));
        alert("Stock deleted successfully");
      } else {
        alert("Failed to delete stock");
      }
    } catch (error) {
      console.error("Error deleting stock:", error);
      alert("Error occurred while deleting stock. Please try again later.");
    }
  };

  const insertStockClosePrice = async (data) => {
    try {
      const { stock_symbol, buy_price, previousClose, date } = data;
      const response = await axios.post('http://localhost:3001/insert-stock-close-price', {
        stock_symbol,
        buy_price,
        previousClose,
        date
      });
      return response.data;
    } catch (error) {
      console.error("Error inserting stock close price:", error);
      throw error;
    }
  };
  

  return (
    <div className="stocks-container">
      <div className="stock">
        <div className="stock-table">
          <h3>Stocks</h3>
          <table>
            <thead>
              <tr>
                <th>Stock Symbol</th>
                <th>Buy Price</th>
                <th>Shares</th>
                <th>Current Price</th>
                <th>Previous Close</th>
                <th>Portfolio</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.stock_symbol}</td>
                  <td>${stock.buy_price}</td>
                  <td>{stock.shares}</td>
                  <td>${stock.current_price}</td>
                  <td>${stock.previous_close}</td>
                  <td>${stock.current_price * stock.shares}</td>
                  <td>
                    <button onClick={() => handleEditStock(stock)}>Edit</button>
                    <button onClick={() => handleDeleteStock(stock._id)}>Delete</button>
                    <button onClick={() => insertStockClosePrice({ stock_symbol: stock.stock_symbol, buy_price: stock.buy_price, previousClose: stock.previous_close, date: new Date() })}>Capture</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="stock-controls"> 
        <form onSubmit={handleSubmit} className="stocks-form"> 
          <div className="stocks-form-group"> 
            <label htmlFor="stockSymbol" className="stocks-label">Stock Symbol:</label> 
            <input
              type="text"
              id="stockSymbol"
              value={stockSymbol}
              onChange={handleStockSymbolChange}
              className="stocks-input" 
              required
            />
          </div>
          <div className="stocks-form-group"> 
            <label htmlFor="buyPrice" className="stocks-label">Buy Price:</label> 
            <input
              type="number"
              id="buyPrice"
              value={buyPrice}
              onChange={handleBuyPriceChange}
              className="stocks-input" 
              required
            />
          </div>
          <div className="stocks-form-group"> 
            <label htmlFor="shares" className="stocks-label">Shares:</label> 
            <input
              type="text"
              id="shares"
              value={shares}
              onChange={handleSharesChange}
              className="stocks-input" 
              required
            />
          </div>
          <button type="submit" className="stocks-button">Submit</button> 
        </form>
      </div>
    </div>
  );
}

export default StockBuyInput;
