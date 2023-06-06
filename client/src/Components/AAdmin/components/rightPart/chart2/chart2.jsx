import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const Graph4 = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = document.getElementById('graph4').getContext('2d');

    const data = {
      labels: ['Crèche A', 'Crèche B', 'Crèche C', 'Crèche D', 'Crèche E', 'Crèche F', 'Crèche G'],
      datasets: [
        {
          label: 'Nombre de réservations',
          data: [15, 10, 8, 6, 4, 3, 2],
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

  return <canvas id="graph4"></canvas>;
};

export default Graph4;