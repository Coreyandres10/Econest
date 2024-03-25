import React, { useState } from 'react';
import './HomeFunctionsStyling/Expenses.css'; // Import CSS file for styling

function Expenses() {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Amount:', amount);
    console.log('Source:', source);
    console.log('Category:', category);
    setAmount('');
    setSource('');
    setCategory('');
  };

  const handleEditExpenses = () => {
    // Add functionality to handle editing expenses
    console.log('Editing expenses...');
  };

  return (
    <div className="expenses-container">
      <h2 className="expenses-heading">Expenses</h2>
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
            <option value="Fixed Expenses">Fixed Expenses</option>
            <option value="Variable Expenses">Variable Expenses</option>
            <option value="Discretionary Expenses">Discretionary Expenses</option>
          </select>
        </div>
        <button type="submit" className="expenses-button">Add Expense</button>
      </form>
      <button onClick={handleEditExpenses} className="edit-expenses-button">Edit Expenses</button>
    </div>
  );
}

export default Expenses;
