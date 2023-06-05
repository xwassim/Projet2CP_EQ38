import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Graph3 = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = document.getElementById('graph3').getContext('2d');

    const data = {
      labels: [  'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Aout','Septembre'],
      datasets: [
        {
          label: 'Nombre de visites',
          data: [500, 1000, 1500, 2000, 1500,1200, 2500],
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
        {
          label: 'Nombre de recherches',
          data: [100, 200, 400, 200,300, 900, 1000],
          backgroundColor: 'rgba(251, 98, 79, 0.3)',
          borderColor: 'rgba(251, 98, 79, 1)',
          borderWidth: 1,
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

    const chart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options,
    });

    setChart(chart);

    return () => chart.destroy();
  }, []);

  return <canvas id="graph3"></canvas>;
};

export default Graph3;