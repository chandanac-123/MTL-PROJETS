import React,{useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
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

// export const options = {
//   elements: {
//     bar: {
//       borderWidth: 50,
//     },
//   },
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'bottom',
//     },
//   },
 
// };


function VerticalChart(props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#4F4F4F',
        fontweight: '600',
      },
    },
    layout: {
      padding: {
        top: 21,
      },
    },
  };

const labels = props.pending_graph_data.labels

const data = {
  labels,
  datasets: [
    {
      label: 'Pending',
      backgroundColor: '#00D2D3',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 0,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: props.pending_graph_data.pending_data,
      barPercentage: 0.3,
      categoryPercentage: 1,
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#4F4F4F',
        fontweight: '600',
      }
    },
  ]
};
    // useEffect(() => {
    //     ChartJS.register(ChartDataLabels);
    //     }, []);
  return (
    <Bar options={options} data={data} />
  )
}

export default VerticalChart
