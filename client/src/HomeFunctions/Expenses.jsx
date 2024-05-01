import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeFunctionsStyling/Expenses.css'; // Importing CSS file for styling

// Component for managing expense-related functionalities
function Expenses() {
  const [amount, setAmount] = useState(''); // State for amount input
  const [source, setSource] = useState(''); // State for source input
  const [category, setCategory] = useState(''); // State for category input
  const [expenses, setExpenses] = useState([]); // State for storing expense transactions
  const [totalExpense, setTotalExpense] = useState(0); // State for storing total expenses
  const [editingExpenseId, setEditingExpenseId] = useState(null); // State for tracking the ID of the expense being edited

  useEffect(() => {
    fetchExpenses(); // Fetch expense data on component mount
  }, []);

  // Function to fetch expense transactions from the server
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-transaction`);
      if (response.data && response.data.response) {
        const transactions = response.data.response;
        // Filter expense transactions and update state
        setExpenses(transactions.filter(transaction => transaction.type.toLowerCase().includes("expense")));
        calculateTotalExpense(transactions); // Calculate and update total expenses
      } else {
        console.error("Invalid expenses data in API response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };
  
  // Function to calculate total expenses from the transactions
  const calculateTotalExpense = (transactions) => {
    if (Array.isArray(transactions)) {
      const total = transactions
        .filter(transaction => transaction.type.toLowerCase().includes("expense"))
        .reduce((acc, cur) => acc + cur.Amount, 0);
      setTotalExpense(total); // Update total expense state
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

  // Event handler for form submission (adding or updating expense)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExpenseId) {
        const updateResponse = await axios.put(`http://localhost:3001/update-expense/${editingExpenseId}`, { amount, category, source });
        if (updateResponse.status === 200) {
          // Clear input fields and reset editing state
          setAmount('');
          setSource('');
          setCategory('');
          setEditingExpenseId(null);
          fetchExpenses(); // Fetch updated expense data
          alert("Expense updated");
        }
      } else {
        const addResponse = await axios.post(`http://localhost:3001/insert-expense`, { amount, category, source });
        if (addResponse.status === 200) {
          // Clear input fields and fetch updated expense data
          setAmount('');
          setSource('');
          setCategory('');
          fetchExpenses(); // Fetch updated expense data
          alert("Expense added");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred. Please try again later.");
    }
  };
  
//-----------------------------------------------------------------------------

  // Event handler for editing an expense
  const handleEditExpense = (expense) => {
    // Set input fields with current expense data and set editing state
    setAmount(expense.Amount);
    setSource(expense.Transaction_Detail);
    setCategory(expense.type);
    setEditingExpenseId(expense._id);
  };

//-----------------------------------------------------------------------------

  // Event handler for deleting an expense
  const handleDeleteExpense = async (expenseId) => {
    try {
      const deleteResponse = await axios.delete(`http://localhost:3001/delete-expense/${expenseId}`);
      if (deleteResponse.status === 200) {
        fetchExpenses(); // Fetch updated expense data
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

