import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeFunctionsStyling/Income.css'; 

// Component for managing income-related functionalities
function Income() {
  const [amount, setAmount] = useState(''); 
  const [source, setSource] = useState(''); 
  const [category, setCategory] = useState(''); 
  const [incomes, setIncomes] = useState([]); 
  const [totalIncome, setTotalIncome] = useState(0); 
  const [editingIncomeId, setEditingIncomeId] = useState(null); 

  useEffect(() => {
    fetchIncomes(); 
  }, []);

  // Function to fetch income transactions from the server
  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-transaction`);
      if (response.data && response.data.response) {
        const transactions = response.data.response;
        // Filter income transactions and update state
        setIncomes(transactions.filter(transaction => transaction.type.toLowerCase().includes("income")));
        calculateTotalIncome(transactions); 
      } else {
        console.error("Invalid income data in API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

  // Function to calculate total income from the transactions
  const calculateTotalIncome = (transactions) => {
    if (Array.isArray(transactions)) {
      const total = transactions
        .filter(transaction => transaction.type.toLowerCase().includes("income"))
        .reduce((acc, cur) => acc + cur.Amount, 0);
      setTotalIncome(total); 
    } else {
      console.error("Invalid transactions data:", transactions);
    }
  };

  // Event handler for amount input change
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  // Event handler for source input change
  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  // Event handler for category input change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

//-----------------------------------------------------------------------------

  // Event handler for form submission (adding or updating income)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingIncomeId) {
        const updateResponse = await axios.put(`http://localhost:3001/update-income/${editingIncomeId}`, { amount, category, source });
        if (updateResponse.status === 200) {
          // Clear input fields and reset editing state
          setAmount('');
          setSource('');
          setCategory('');
          setEditingIncomeId(null);
          fetchIncomes(); 
          alert("Income updated");
        }
      } else {
        const addResponse = await axios.post(`http://localhost:3001/insert-income`, { amount, category, source });
        if (addResponse.status === 200) {
          // Clear input fields and fetch updated income data
          setAmount('');
          setSource('');
          setCategory('');
          fetchIncomes(); 
          alert("Income added");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Please try again later.");
    }
  };

//-----------------------------------------------------------------------------

  // Event handler for editing an income
  const handleEditIncome = (income) => {
    // Set input fields with current income data and set editing state
    setAmount(income.Amount);
    setSource(income.Transaction_Detail);
    setCategory(income.type);
    setEditingIncomeId(income._id);
  };

//-----------------------------------------------------------------------------

  // Event handler for deleting an income
  const handleDeleteIncome = async (incomeId) => {
    try {
      const deleteResponse = await axios.delete(`http://localhost:3001/delete-income/${incomeId}`);
      if (deleteResponse.status === 200) {
        fetchIncomes(); 
        alert("Income deleted successfully");
      } else {
        alert("Failed to delete income");
      }
    } catch (error) {
      console.error("Error deleting income:", error);
      alert("Error deleting Income. Please try again later.");
    }
  };
  
//-----------------------------------------------------------------------------

// Function to format the amount with commas and decimal points
const formatAmount = (amount) => {
  // Check if the amount is a whole number
  if (Number.isInteger(amount)) {
    return amount.toFixed(2); // Add '.00' for whole numbers
  } else {
    // Convert the number to a string and split it into parts (before and after the decimal point)
    const parts = amount.toString().split('.');
    // Add commas to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // Return the formatted amount
    return parts.join('.');
  }
};

//-----------------------------------------------------------------------------

  return (
    <div className="incomes-container">
      <div className="income">
        <div className="income-table">
          <h3>Incomes</h3>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.Transaction_Detail}</td>
                  <td>${formatAmount(transaction.Amount)}</td>
                  <td>{transaction.type}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditIncome(transaction)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDeleteIncome(transaction._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-incomes">Total Incomes: ${formatAmount(totalIncome)}</p>
        </div>
      </div>
      
      <div className="income-controls">
        <form onSubmit={handleSubmit} className="incomes-form">
          <div className="incomes-form-group">
            <label htmlFor="amount" className="incomes-label">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="incomes-input"
              required
            />
          </div>
          <div className="incomes-form-group">
            <label htmlFor="source" className="incomes-label">Source:</label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={handleSourceChange}
              className="incomes-input"
              required
            />
          </div>
          <div className="incomes-form-group">
            <label htmlFor="category" className="incomes-label">Category:</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="incomes-select"
              required
            >
              <option value="">Select Category</option>
              <option value="Earned Income">Earned Income</option>
              <option value="Passive Income">Passive Income</option>
            </select>
          </div>
          <button type="submit" className="incomes-button">{editingIncomeId ? 'Update Income' : 'Add Income'}</button>
        </form>
      </div>
    </div>
  );
}

export default Income;

