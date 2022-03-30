import { React, useState, useEffect } from 'react';

import { Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(

  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);




const Linechart = (props) => {


  const options = {
   
    plugins: {
      legend: {
        position: 'top',
      },
   
    },
  };

const labels = props.labels


  const data = {
    labels,
    datasets: [
      {
        label: 'expense',
        data: props.expensevalues,
        borderColor: 'rgb(211, 47, 47)',
        backgroundColor: 'rgba(211, 47, 47)',
      },
      {
        label: 'income',
        data: props.incomevalues,
        borderColor: 'rgb(70, 59, 96)',
        backgroundColor: 'rgba(70, 59, 96)',
      },
    ],
    maintainAspectRatio: false,

  };



  return (
   
      <Line options={options} data={data} />
  );

}

export default Linechart;