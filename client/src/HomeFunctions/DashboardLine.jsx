import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

function DashboardLineChart() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-stock-close-prices`);
      console.log("Response:", response.data);
      setStockData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("Stock Data:", stockData);
  }, [stockData]);

  // Transform the data for Chart.js
  const stockLabels = stockData.map(entry => entry.buy_date);
  const stockPrices = stockData.map(entry => entry.previousClose);

  const data = {
    labels: stockLabels,
    datasets: [
      {
        label: 'Stock Close Prices',
        data: stockPrices,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 0.6)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2 className="chart-heading">Stock Close Prices Over Time</h2>
      <Line data={data} />
    </div>
  );
}

export default DashboardLineChart;
