import 'chart.js/auto';
import dayjs from 'dayjs';
import React from 'react';
import { Line } from 'react-chartjs-2';

function getDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(dayjs(new Date(currentDate)).format('DD/MM/YYYY'));

    currentDate = currentDate.add(1, 'day');
  }
  return dateArray;
}

export default function LineChart({ data, startDate, endDate, color }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const labels = getDates(startDate, endDate);
  const chartData = {
    labels: labels,
    datasets: [
      {
        backgroundColor: color,
        borderColor: color,
        data: data,
      },
    ],
  };

  return <Line data={chartData} options={options} />;
}
