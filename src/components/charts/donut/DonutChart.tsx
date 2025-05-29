import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  data: { name: string; value: number }[];
  colors: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({ data, colors }) => {
  const [, setActiveIndex] = useState<number | null>(null);


  const chartData: ChartData<'doughnut', number[], string> = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: colors,
        hoverOffset: 8,
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 8,
          padding: 16,
          // tambahkan value pada legend label
          generateLabels: (chart) =>{
            const dataset = chart.data.datasets[0];
            return chart.data.labels!.map((label, i) => ({
              text: `${label}: ${dataset.data[i]}`,
              fillStyle: (dataset.backgroundColor as string[])[i],
              strokeStyle: '',
              lineWidth: 0,
              hidden: !chart.getDataVisibility(i),
              index: i,
            }));
          }
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed}`,
        },
      },
    },
    onHover: (evt, elements) => {
      if (elements.length > 0) {
        setActiveIndex(elements[0].index);
      } else {
        setActiveIndex(null);
      }
    },
  };

  return (
    <div className="relative w-7/8 h-32">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;
