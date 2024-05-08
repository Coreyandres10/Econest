import React from 'react';
import '/Users/emanuel/Econest/client/src/HomeFunctions/HomeFunctionsStyling/FinancialTable.css';

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
            <th className="category-header">Category</th>
            <th className="amount-header">Amount</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td className="category">Income</td>
              <td className="amount-value">$ {formatNumber(totalIncome)}</td>
            </tr>
            <tr>
              <td className="category">Expenses</td>
              <td className="amount-value">$ {formatNumber(totalExpense)}</td>
            </tr>
            <tr>
              <td className="category">Net Income</td>
              <td className="amount-value">$ {formatNumber(netIncome)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinanceTable;
