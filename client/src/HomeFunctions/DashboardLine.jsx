import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

// Component for displaying a line chart of portfolio value over time
function DashboardLineChart() {
  const [stockData, setStockData] = useState([]); // State for storing stock data
  const [selectedStock, setSelectedStock] = useState(null); // State for storing selected stock symbol

  useEffect(() => {
    fetchData(); // Fetch stock data on component mount
  }, []);

  // Function to fetch stock data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-stock-close-prices`);
      console.log("Response:", response.data);
      setStockData(response.data); // Update stock data state with fetched data
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

  // Data for the line chart
  const data = {
    labels: stockLabels,
    datasets: [
      {
        label: 'Portfolio Value',
        data: portfolioValue,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 0.6)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2 className="chart-heading">Portfolio Value Over Time</h2>
      <select value={selectedStock} onChange={handleStockChange}>
        <option value="">Select a stock</option>
        {/* Render options based on unique stock symbols */}
        {Array.from(new Set(stockData.map(entry => entry.stock_symbol))).map(stockSymbol => (
          <option key={stockSymbol} value={stockSymbol}>{stockSymbol}</option>
        ))}
      </select>
      <div className="chart-container">
        <Line data={data} />
      </div>
    </div>
  );
}

export default DashboardLineChart;

