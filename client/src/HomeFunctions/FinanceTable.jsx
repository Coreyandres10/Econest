import React from 'react';

// Functional component for displaying financial summary
function FinanceTable({ expense, income }) {
  // Calculate total expense
  const totalExpense = expense.reduce((total, transaction) => total + transaction.Amount, 0);
  // Calculate total income
  const totalIncome = income.reduce((total, transaction) => total + transaction.Amount, 0);
  // Calculate net income
  const netIncome = totalIncome - totalExpense;

  // Function to format numbers with commas and decimals
  const formatNumber = (number) => {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  return (
    <div className="finance-table-container">
      <div className="finance-table-content">
        <table className="finance-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Income:</td>
              <td className="amount-value">$ {formatNumber(totalIncome)}</td>
            </tr>
            <tr>
              <td>Expenses:</td>
              <td className="amount-value">$ {formatNumber(totalExpense)}</td>
            </tr>
            <tr>
              <td>Net Income:</td>
              <td className="amount-value">$ {formatNumber(netIncome)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinanceTable;
