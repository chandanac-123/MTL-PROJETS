import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale,BarElement,ArcElement,RadialLinearScale, LinearScale, PointElement, LineElement, Tooltip, Title } from "chart.js";

const BasicCard = ({lineColor}) => {
  Chart.register(CategoryScale,BarElement,ArcElement,RadialLinearScale, LinearScale, PointElement, LineElement, Tooltip, Title);

  const labels = ["January", "February", "March", "April", "May", "June"];

  const data = {
    labels: labels,
    datasets: [
      {
        backgroundColor: lineColor,
        borderColor: lineColor,
        lineTension:0.4,
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };
  
  const options = {
    maintainAspectRatio: false, // Prevents chart from maintaining aspect ratio
    responsive: true,
    scales: {
      x: {
        display: false, // Hide the x-axis
      },
      y: {
        display: false, // Hide the y-axis
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
    elements: {
      point: {
        radius:true, // Hide data points
      },
    },
    layout: {
      padding: 0, // Set padding to 0 to remove chart area background
    },
    // Configure grid options
    plugins: {
      title: {
        display: false, // Hide chart title
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
      grid: {
        display: false, // Hide the grid lines and labels
      },
    },
    
  };

  return (
    <div className="h-14">
      <Line data={data} options={options}  />
    </div>
  );
};

export default BasicCard;