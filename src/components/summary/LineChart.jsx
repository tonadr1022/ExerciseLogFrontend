import {
  Chart as ChartJS,
  Tooltip,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

const LineChart = ({ chartData, metric, labels, timeFrame, isCumulative }) => {
  ChartJS.register(
    Tooltip,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
  );

  const unitLabel =
    isCumulative && metric?.cumulativeUnit
      ? " (" + metric.cumulativeUnit + ")"
      : metric?.unit
      ? " (" + metric.unit + ")"
      : "";

  const titleText = `${isCumulative ? "Cumulative " : ""}${
    metric.text
  } this ${timeFrame}${unitLabel}`;

  const options = {
    plugins: {
      title: {
        display: true,
        text: titleText,
      },
    },
    scales: {
      y: {
        beginAtZero: metric?.beginYAxisAtZero === true,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: metric.text,
        data: chartData,
        backgroundColor: "green",
        borderColor: "black",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};

export default LineChart;
