import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const  PieChart = (props) => {
    const options = {
   
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: props.title,
          },
        },
      };
    const colors = props.colors1
  
    const data = {

        

        labels: props.labels,
        datasets: [
          {
            label: '# of Votes',
            data: props.data,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      };
      


  return (
    <Doughnut data={data} options={options} />
)
}


 export default PieChart;