import React from 'react';
import { Pie } from 'react-chartjs-2';

// Component for displaying a combined pie chart of income and expenses
function CombinedPieChart({ expense, income, style }) {
  // Calculate total expense
  const totalExpense = expense.reduce((total, transaction) => total + transaction.Amount, 0);
  // Calculate total income
  const totalIncome = income.reduce((total, transaction) => total + transaction.Amount, 0);
  // Calculate net income
  const netIncome = totalIncome - totalExpense;

  // Data for the pie chart
  const data = {
    labels: ['Expense', 'Net Income'],
    datasets: [
      {
        label: 'Income vs Expenses',
        data: [totalExpense, netIncome],
        backgroundColor: [
          'red', 
          'green', 
        ],
        borderColor: 'black', 
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={style}>
      <h2 className="chart-heading">Net Income vs Expenses</h2>
      <Pie data={data} />
    </div>
  );
}

export default CombinedPieChart;




