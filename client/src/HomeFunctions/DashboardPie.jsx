import React from 'react';
import { Pie } from 'react-chartjs-2';

function CombinedPieChart({ expense, income, style }) {
  const totalExpense = expense.reduce((total, transaction) => total + transaction.Amount, 0);
  const totalIncome = income.reduce((total, transaction) => total + transaction.Amount, 0);


  const netIncome = totalIncome - totalExpense;

  const data = {
    labels: ['Expense', 'Net Income'],
    datasets: [
      {
        label: 'Income vs Expenses',
        data: [totalExpense, netIncome], 
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)'   
        ],
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