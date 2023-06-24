import { useState } from "react";
import LineChart from "./LineChart";
import { format } from "date-fns";
import {
  Typography,
  Checkbox,
  FormGroup,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { accumulate, decumulate } from "../../utils/arrayUtils";
import {
  formatDuration,
  unformatDuration,
  unformatPace,
} from "../../utils/formatContent";

const graphMetrics = [
  {
    value: "distance",
    text: "Distance",
    unit: "mi",
    cumulative: true,
    beginYAxisAtZero: true,
  },
  {
    value: "pace",
    text: "Pace",
    unit: "min/mi",
    cumulative: false,
    beginYAxisAtZero: false,
    unformatFunction: unformatPace,
  },
  {
    value: "duration",
    text: "Duration",
    unit: "min",
    cumulative: true,
    beginYAxisAtZero: true,
    unformatFunction: unformatDuration,
    cumulativeUnit: "hr",
    accumulateFormatFunction: (duration) => duration / 60,
    decumulateFormatFunction: (duration) => duration * 60,
  },
  {
    value: "rating",
    text: "Rating",
    cumulative: false,
    beginYAxisAtZero: true,
  },
  {
    value: "calories",
    text: "Calories",
    cumulative: true,
    beginYAxisAtZero: true,
  },
  {
    value: "heartrate",
    text: "Heartrate",
    unit: "bpm",
    cumulative: false,

    beginYAxisAtZero: false,
  },
  {
    value: "temperature",
    text: "Temperature",
    unit: "°F",
    cumulative: false,
    beginYAxisAtZero: false,
  },
  {
    value: "feelsLike",
    text: "Feels Like",
    unit: "°F",
    cumulative: false,
    beginYAxisAtZero: false,
  },
  {
    value: "humidity",
    text: "Humidity",
    cumulative: false,
    beginYAxisAtZero: true,
  },
];

const SummaryChart = ({ exercises, timeFrame }) => {
  exercises = exercises.toReversed();
  const [chartData, setChartData] = useState(
    exercises.map((exercise) => exercise?.distance || 0)
  );
  const [metric, setMetric] = useState(graphMetrics[0]);
  const [isCumulative, setIsCumulative] = useState(false);

  const handleIsCumulativeChange = (event, newIsCumulative) => {
    // need newIsCumulative because state doesn't get updated until next render
    // if new state is cumulative, accumulate the data into new array.
    // If change to not cumulative, decumulate the data to original state
    if (newIsCumulative) {
      const cumulativeData = accumulate(
        chartData,
        metric?.accumulateFormatFunction
      );
      setChartData(cumulativeData);
    } else {
      const decumulatedData = decumulate(
        chartData,
        metric?.decumulateFormatFunction
      );
      setChartData(decumulatedData);
    }
    setIsCumulative(newIsCumulative);
  };

  const handleMetricChange = (event) => {
    const newMetric = event.target.value;
    if (!newMetric.cumulative) {
      setIsCumulative(false);
    }

    setMetric(newMetric);

    // property map of exercises as they are passed into this component
    const propertyMap = {
      distance: "distance",
      calories: "calories",
      pace: "pace",
      duration: "duration",
      rating: "rating",
      heartrate: "average_heartrate",
      "elevation gain": "total_elevation_gain",
      temperature: "weather.temperature",
      feelsLike: "weather.feels_like",
      humidity: "weather.humidity",
    };

    // get the properties of current metric
    const properties = propertyMap[newMetric.value];

    // get the array of values for the new metric by mapping exercises
    // and accessing the property associated with newMetric
    let nonCumulativeData = exercises.map((exercise) => {
      const propertyPath = properties.split(".");
      let val = exercise;
      for (const property of propertyPath) {
        val = val?.[property];
        if (newMetric?.unformatFunction) {
          val = newMetric.unformatFunction(val);
        }
        if (val === undefined) break;
      }
      return val;
    });

    // if cumulative state, accumulate the data for graph,
    // must check newMetric's cumulativity because state doesn't update until rerender
    if (isCumulative && newMetric.cumulative) {
      setChartData(accumulate(nonCumulativeData));
    } else {
      setChartData(nonCumulativeData);
    }
  };
  // x-axis labels are dates of exercises
  const labels = exercises.map((exercise) =>
    format(new Date(exercise.datetime_started), "ccc M/d")
  );

  return (
    <>
      <LineChart
        chartData={chartData}
        metric={metric}
        labels={labels}
        timeFrame={timeFrame}
        isCumulative={isCumulative}
      />
      <>
        <Select
          labelId="metric-label"
          defaultValue={graphMetrics[0]}
          onChange={handleMetricChange}
          value={metric}>
          {graphMetrics.map((metric, i) => (
            <MenuItem key={i} value={metric}>
              {metric.text}
            </MenuItem>
          ))}
        </Select>
      </>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={isCumulative}
              disabled={!metric.cumulative}
              onChange={handleIsCumulativeChange}
            />
          }
          label="Cumulative"
        />
      </FormGroup>
    </>
  );
};

export default SummaryChart;
