import React from "react";
import calcExerciseStats from "../../utils/calcExerciseStats";
import SummaryTable from "./SummaryTable";
const StatisticsTables = ({ data }) => {
  const { exerciseMetrics, weatherMetrics, numExercises } =
    calcExerciseStats(data);
  return (
    <>
      <SummaryTable metrics={exerciseMetrics} includeTotal={true} />
      <SummaryTable metrics={weatherMetrics} includeTotal={false} />
    </>
  );
};

export default StatisticsTables;
/*     distance,
    duration,
    calories,
    avgPace,
    avgCalories,
    avgTemperature,
    avgFeelsLike,
    avgHumidity,
    avgWindSpeed,*/
