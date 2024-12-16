import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function HorrizontalChart(props) {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 50,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      // title: {
      //   display: true,
      //   text: 'Chart.js Horizontal Bar Chart',
      // },
    },
    layout: {
      padding: {
        right: 60,
      },
    },
  };

  const labels = ["Today", "Yesterday", "For the Month"];

  const data = {
    labels,
    datasets: [
      {
        label: "TAT IN",
        backgroundColor: "#00D2D3",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 0,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: props.tat_graph_data.tat_in_data,
        barPercentage: 0.4,
        categoryPercentage: 1,
        datalabels: {
          anchor: "end",
          align: "end",
          color: "#4F4F4F",
          fontweight: "600",
        },
      },
      {
        label: "TAT OUT",
        backgroundColor: "#FF0303",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 0,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: props.tat_graph_data.tat_out_data,
        barPercentage: 0.4,
        categoryPercentage: 1,
        datalabels: {
          anchor: "end",
          align: "end",
          color: "#FF0303",
        },
      },
    ],
  };
  // useEffect(() => {
  //     ChartJS.register(ChartDataLabels);
  //     }, []);
  return <Bar options={options} data={data} />;
}

export default HorrizontalChart;
