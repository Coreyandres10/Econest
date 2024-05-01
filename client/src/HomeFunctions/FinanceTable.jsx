import React from 'react';

// Functional component for displaying financial summary
function FinanceTable({ expense, income }) {
  // Calculate total expense
  const totalExpense = expense.reduce((total, transaction) => total + transaction.Amount, 0);
  // Calculate total income
  const totalIncome = income.reduce((total, transaction) => total + transaction.Amount, 0);
  // Calculate net income
  const netIncome = totalIncome - totalExpense;

  return (
    <div className="finance-table-container">
      <h2 className="finance-table-heading">Financial Summary</h2>
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
              <td className="amount-value">$ {totalIncome}</td> {/* Add dollar sign to display total income */}
            </tr>
            <tr>
              <td>Expenses:</td>
              <td className="amount-value">$ {totalExpense}</td> {/* Add dollar sign to display total expense */}
            </tr>
            <tr>
              <td>Net Income:</td>
              <td className="amount-value">$ {netIncome}</td> {/* Add dollar sign to display net income */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FinanceTable;






