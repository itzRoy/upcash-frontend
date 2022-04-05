import { React } from 'react';

import { Line} from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
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
        label: 'income',
        data: props.incomevalues,
        borderColor: 'rgb(0, 230, 118)',
        backgroundColor: 'rgba(0, 230, 118, .8)',
      },
      {
        label: 'expense',
        data: props.expensevalues,
        borderColor: 'rgb(211, 47, 47)',
        backgroundColor: 'rgba(211, 47, 47, .8)',
      },
     
    ],
    maintainAspectRatio: false,

  };



  return (
   
      <Bar options={options} data={data} />
  );

}

export default Linechart;