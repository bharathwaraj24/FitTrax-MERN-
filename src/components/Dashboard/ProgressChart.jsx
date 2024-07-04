import React from "react";
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

const ProgressChart = () => {
    const data = {
        labels: ['January','February','March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Workout Completed',
                data: [5, 6, 7, 8, 9, 10],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },  
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options}/>;
};

export default ProgressChart;