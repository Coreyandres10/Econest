import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CombinedPieChart from './DashboardPie';
import CombinedLineChart from './DashboardLine';
import './HomeFunctionsStyling/Dashboard.css'

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-transaction`);
      console.log("Response:", response.data);
      setTransactions(response.data.response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("Transactions:", transactions);
  }, [transactions]);

  const expense = transactions.filter(transaction => transaction.type.toLowerCase().includes("expense"));
  const income = transactions.filter(transaction => transaction.type.toLowerCase().includes("income"));

  return (
    <div className="dashboard-container">
      <CombinedPieChart expense={expense} income={income} style={{ width: '400px', height: '400px' }} />
      <CombinedLineChart />
    </div>
  );
}

export default Dashboard;