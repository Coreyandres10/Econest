import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeFunctionsStyling/Income.css';

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

  const fetchIncomes = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-transaction`);
      if (response.data && response.data.response) {
        const transactions = response.data.response;
        setIncomes(transactions.filter(transaction => transaction.type.toLowerCase().includes("income")));
        calculateTotalIncome(transactions);
      } else {
        console.error("Invalid income data in API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching income:", error);
    }
  };

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

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

//-----------------------------------------------------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingIncomeId) {
        const updateResponse = await axios.put(`http://localhost:3001/update-income/${editingIncomeId}`, { amount, category, source });
        if (updateResponse.status === 200) {
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

  const handleEditIncome = (income) => {
    setAmount(income.Amount);
    setSource(income.Transaction_Detail);
    setCategory(income.type);
    setEditingIncomeId(income._id);
  };

//-----------------------------------------------------------------------------

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
                  <td>${transaction.Amount}</td>
                  <td>{transaction.type}</td>
                  <td>
                    <button onClick={() => handleEditIncome(transaction)}>Edit</button>
                    <button onClick={() => handleDeleteIncome(transaction._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total Incomes: ${totalIncome}</p>
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
