import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { format } from "date-fns";
import BarChart from "./BarChart";
import { Box } from "@mui/material";
const SummaryStatsChart = ({ timeFrame, data }) => {
  const [chartData, setChartData] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    if (data) {
      const labels = [];
      const dataset = [];
      let formatUnits;
      if (timeFrame === "month") {
        formatUnits = "LLL";

        // week
      } else {
        formatUnits = "M/d";
      }

      for (const row of data) {
        labels.push(format(new Date(row.start_datetime), formatUnits));
        dataset.push(row.stats.total_distance);
      }

      const currOptions = {
        plugins: {
          title: {
            display: true,
            text: timeFrame,
          },
        },
      };
      setOptions(currOptions);
      const currData = {
        labels: labels,
        datasets: [
          {
            label: "distance",
            data: dataset,
            backgroundColor: "green",
            borderColor: "black",
          },
        ],
      };
      setChartData(currData);
    }
  }, []);

  return options && chartData ? (
    <BarChart options={options} data={chartData} />
  ) : (
    <div>no options</div>
  );
};

export default SummaryStatsChart;
