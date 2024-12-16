import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { formatCurrencyIndianStyle } from "../../Utils/utils";

const IncomeBasicDonutCard = ({ amount }) => {
  Chart.register();
  const labels = ["Cash", "Account","Investment","Advance"];

  const data = {
    labels: labels,
    datasets: [
      {
        data: [amount?.cash_income, amount?.bank_income,amount?.investment_income,amount?.advance_income],
        backgroundColor: ['#009EF7', '#EC305E', '#9016ed','#0dcb72'],
      },
    ],
  };

  const options = {
    cutout: "70%", // Adjust the cutout percentage for the donut chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = formatCurrencyIndianStyle(data.datasets[0].data[context.dataIndex],25);
            return `${value}`;
          },
        },
      },
    },
  };

  const optionsDefault = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        display: false,
        callbacks: {
          label: function (context) {
            return "0 Income"
          },
        },
      },
    },
  };

  return (
    <div className="">
      {amount == 0 ?
        <Doughnut data={{
          labels: [],
          datasets: [
            {
              data: [1], // Add a dummy value to display the default color
              backgroundColor: ['#CCCCCC'], // Default color
            },
          ],
        }} options={optionsDefault} width={100} height={70} />
        :
        <Doughnut data={data} options={options} width={120} height={70} />
      }
    </div>
  );
};

export default IncomeBasicDonutCard;
