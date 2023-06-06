import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import InvestmentsDB from "../../leftPart/utils/InvestmentsDB";

const Graph4 = () => {
  const [chart, setChart] = useState(null);
  const {TopCreches}= InvestmentsDB();
  const nomCreches = TopCreches.map((item) => item.name);
  const noteEvaluation = TopCreches.map((item) => item.noteEvaluation);

  useEffect(() => {
    const ctx = document.getElementById('graph4').getContext('2d');

    const data = {
      labels: nomCreches,
      datasets: [
        {
          label: 'Nombre de réservations',
          data: noteEvaluation,
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