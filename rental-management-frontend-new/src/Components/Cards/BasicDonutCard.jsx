import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { formatCurrencyIndianStyle } from "../../Utils/utils";

const BasicDonutCard = ({ amount }) => {
  Chart.register();
  const labels = ["Recieved", "Target"];

  const data = {
    labels: labels,
    datasets: [
      {
        data: [amount?.income_recieved, amount?.target_amount],
        backgroundColor: ['#EC305E', '#009EF7'],
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
        }} options={optionsDefault} width={120} height={90} />
        :
        <Doughnut data={data} options={options} width={120} height={90} />
      }
    </div>
  );
};

export default BasicDonutCard;
