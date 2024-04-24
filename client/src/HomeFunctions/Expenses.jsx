import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeFunctionsStyling/Expenses.css'; 

function Expenses() {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-transaction`);
      if (response.data && response.data.response) {
        const transactions = response.data.response;
        setExpenses(transactions.filter(transaction => transaction.type.toLowerCase().includes("expense")));
        calculateTotalExpense(transactions);
      } else {
        console.error("Invalid expenses data in API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  
  const calculateTotalExpense = (transactions) => {
    if (Array.isArray(transactions)) {
      const total = transactions
        .filter(transaction => transaction.type.toLowerCase().includes("expense"))
        .reduce((acc, cur) => acc + cur.Amount, 0);
      setTotalExpense(total);
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
      if (editingExpenseId) {
        const updateResponse = await axios.put(`http://localhost:3001/update-expense/${editingExpenseId}`, { amount, category, source });
        if (updateResponse.status === 200) {
          setAmount('');
          setSource('');
          setCategory('');
          setEditingExpenseId(null);
          fetchExpenses();
          alert("Expense updated");
        }
      } else {
        const addResponse = await axios.post(`http://localhost:3001/insert-expense`, { amount, category, source });
        if (addResponse.status === 200) {
          setAmount('');
          setSource('');
          setCategory('');
          fetchExpenses();
          alert("Expense added");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Please try again later.");
    }
  };
  
//-----------------------------------------------------------------------------

  const handleEditExpense = (expense) => {
    setAmount(expense.Amount);
    setSource(expense.Transaction_Detail);
    setCategory(expense.type);
    setEditingExpenseId(expense._id);
  };

//-----------------------------------------------------------------------------

  const handleDeleteExpense = async (expenseId) => {
    try {
      const deleteResponse = await axios.delete(`http://localhost:3001/delete-expense/${expenseId}`);
      if (deleteResponse.status === 200) {
        fetchExpenses(); 
        alert("Expense deleted successfully");
      } else {
        alert("Failed to delete expense");
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Error deleting expense. Please try again later.");
    }
  };
 
//-----------------------------------------------------------------------------

  return (
    <div className="expenses-container">
      <div className="expense">
        <div className="expense-table">
          <h3>Expenses</h3>
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
              {expenses.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.Transaction_Detail}</td>
                  <td>${transaction.Amount}</td>
                  <td>{transaction.type}</td>
                  <td>
                    <button onClick={() => handleEditExpense(transaction)}>Edit</button>
                    <button onClick={() => handleDeleteExpense(transaction._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Total Expenses: ${totalExpense}</p>
        </div>
      </div>
      
      <div className="expense-controls">
        <form onSubmit={handleSubmit} className="expenses-form">
          <div className="expenses-form-group">
            <label htmlFor="amount" className="expenses-label">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className="expenses-input"
              required
            />
          </div>
          <div className="expenses-form-group">
            <label htmlFor="source" className="expenses-label">Source:</label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={handleSourceChange}
              className="expenses-input"
              required
            />
          </div>
          <div className="expenses-form-group">
            <label htmlFor="category" className="expenses-label">Category:</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="expenses-select"
              required
            >
              <option value="">Select Category</option>
              <option value="Fixed Expense">Fixed Expense</option>
              <option value="Discretionary Expense">Discretionary Expense</option>
            </select>
          </div>
          <button type="submit" className="expenses-button">{editingExpenseId ? 'Update Expense' : 'Add Expense'}</button>
        </form>
      </div>
    </div>
  );
}

export default Expenses;
