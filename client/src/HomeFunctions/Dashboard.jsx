import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CombinedPieChart from './DashboardPie';
import CombinedLineChart from './DashboardLine';
import FinanceTable from './FinanceTable'; 
import './HomeFunctionsStyling/Dashboard.css';

// Component for the dashboard displaying various financial data
function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData(); // Fetch transaction data on component mount
  }, []);

  // Function to fetch transaction data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-transaction`);
      console.log("Response:", response.data);
      setTransactions(response.data.response); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Effect to log transaction data whenever it changes
  useEffect(() => {
    console.log("Transactions:", transactions);
  }, [transactions]);

  // Filter transactions into expense and income categories
  const expense = transactions.filter(transaction => transaction.type.toLowerCase().includes("expense"));
  const income = transactions.filter(transaction => transaction.type.toLowerCase().includes("income"));

  return (
    <div className="dashboard-container">
      <CombinedPieChart expense={expense} income={income}/>
      <div className="finance-summary">
        <h2 className="finance-table-heading">Financial Summary</h2>
        <div className="finance-table-container">
          <FinanceTable expense={expense} income={income} />
        </div>
      </div>
      <CombinedLineChart/>
    </div>
  );
}

export default Dashboard;

