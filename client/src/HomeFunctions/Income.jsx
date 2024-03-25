import React, { useState } from 'react';
import './HomeFunctionsStyling/Income.css';

function Income() {
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

  const handleEditIncome = () => {
    // Add functionality to handle editing income
    console.log('Editing income...');
  };

  return (
    <div className="income-container">
      <h2 className="income-heading">Income</h2>
      <form onSubmit={handleSubmit} className="income-form">
        <div className="income-form-group">
          <label htmlFor="amount" className="income-label">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className="income-input"
            required
          />
        </div>
        <div className="income-form-group">
          <label htmlFor="source" className="income-label">Source:</label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={handleSourceChange}
            className="income-input"
            required
          />
        </div>
        <div className="income-form-group">
          <label htmlFor="category" className="income-label">Category:</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="income-select"
            required
          >
            <option value="">Select Category</option>
            <option value="Earned Income">Earned Income</option>
            <option value="Passive Income">Passive Income</option>
            <option value="Retirement Income">Retirement Income</option>
          </select>
        </div>
        <button type="submit" className="income-button">Add Income</button>
      </form>
      <button onClick={handleEditIncome} className="edit-expenses-button">Edit Income</button>
    </div>
  );
}

export default Income;
