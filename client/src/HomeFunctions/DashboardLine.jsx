import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

// Component for displaying a line chart of portfolio value over time
function DashboardLineChart() {
  const [stockData, setStockData] = useState([]); 
  const [selectedStock, setSelectedStock] = useState(null); 

  useEffect(() => {
    fetchData(); 
  }, []);

  // Function to fetch stock data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-stock-close-prices`);
      console.log("Response:", response.data);
      setStockData(response.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Effect to log stock data whenever it changes
  useEffect(() => {
    console.log("Stock Data:", stockData);
  }, [stockData]);

  // Function to calculate portfolio value based on stock data
  const calculatePortfolioValue = () => {
    // Initialize portfolio value array with zeros
    const portfolioValue = new Array(stockData.length).fill(0);

    // Loop through each stock data entry
    stockData.forEach((entry, index) => {
      // Calculate the value of the stock based on previous close price
      const stockValue = entry.previousClose * entry.shares;

      // Update the portfolio value array with the stock value
      portfolioValue[index] += stockValue;
    });

    return portfolioValue;
  };

  // Event handler for selecting a different stock
  const handleStockChange = (event) => {
    setSelectedStock(event.target.value);
  };

  // Filter stock data based on selected stock symbol
  const filteredStockData = selectedStock ? stockData.filter(entry => entry.stock_symbol === selectedStock) : stockData;

  // Transform the filtered data for Chart.js
  const stockLabels = filteredStockData.map(entry => {
    const date = new Date(entry.buy_date);
    return date.toLocaleDateString('en-US'); // Format date as MM/DD/YYYY
  });
  const portfolioValue = calculatePortfolioValue();
  const reversedLabels = stockLabels.reverse();

  // Data for the line chart
  const data = {
    labels: reversedLabels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: portfolioValue.reverse(),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 0.6)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2 className="line-chart-heading">Stock Portfolio Over Time</h2>
      <div className="chart-container" style={{ width: '750px'}}>
        <Line data={data} />
      </div>
      <select 
        value={selectedStock} 
        onChange={handleStockChange}
        className="stock-select"
      >
        <option value="">Select a stock</option>
        {Array.from(new Set(stockData.map(entry => entry.stock_symbol))).map(stockSymbol => (
          <option key={stockSymbol} value={stockSymbol}>{stockSymbol}</option>
        ))}
      </select>
    </div>
  );
}

export default DashboardLineChart;

