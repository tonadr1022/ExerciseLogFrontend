import {
  Chart as ChartJS,
  Tooltip,
  Title,
  CategoryScale,
  BarElement,
  LinearScale,
} from "chart.js";
ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement, Title);
import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ options, data }) => {
  return <Bar options={options} data={data} />;
};

export default BarChart;
