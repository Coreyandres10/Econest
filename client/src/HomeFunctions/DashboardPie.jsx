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
    labels: ['Net Income', 'Expenses'],
    datasets: [
      {
        label: 'Income vs Expenses',
        data: [netIncome, totalExpense],
        backgroundColor: [
          'rgba(0, 153, 153, 0.6)', // Teal
          'rgba(255, 0, 0, 0.5)', // Bright Red
        ],
        borderColor: 'black', 
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={style}>
      <h2 className="pie-chart-heading">Net Income vs Expenses</h2>
      <div style={{ width: '480px', height: '480px' }}> 
        <Pie data={data} className="piechart"/>
      </div>
    </div>
  );
}

export default CombinedPieChart;




