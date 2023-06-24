import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getStatsExercises } from "../api/exercisesApi";
import { Box, CircularProgress, Typography } from "@mui/material";
import ExerciseCards from "../components/display/ExerciseCards";
import StatisticsTables from "../components/summary/StatisticsTables";
import {
  getMostRecentMonday,
  getMonthStart,
  changeDatetimeByDays,
  changeDatetimeByMonths,
} from "../utils/dateUtils";
import ForwardBackwardButtons from "../components/display/ForwardBackwardButtons";
import CombinedRouteMap from "../components/summary/CombinedRouteMap";
import ViewToggle from "../components/display/ViewToggle";
import SummaryChart from "../components/summary/SummaryChart";
const mostRecentMonday = getMostRecentMonday();
const monthStartInitial = getMonthStart();

const StatisticsPage = () => {
  // state to hold date ranges between month and week
  const [weekStart, setWeekStart] = useState(mostRecentMonday);
  const [weekEnd, setWeekEnd] = useState(
    changeDatetimeByDays(mostRecentMonday, 7)
  );
  const [monthStart, setMonthStart] = useState(monthStartInitial);
  const [monthEnd, setMonthEnd] = useState(
    changeDatetimeByMonths(monthStartInitial, 1)
  );

  const [timeFrame, setTimeFrame] = useState("Week");
  const [activityType, setActivityType] = useState("run");

  const handleDayChange = (numDays) => {
    setWeekStart(changeDatetimeByDays(weekStart, numDays));
    setWeekEnd(changeDatetimeByDays(weekEnd, numDays));
  };

  const handleMonthChange = (numMonths) => {
    setMonthStart(changeDatetimeByMonths(monthStart, numMonths));
    setMonthEnd(changeDatetimeByMonths(monthEnd, numMonths));
  };

  const {
    data: exercises,
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery(
    [
      timeFrame === "Week"
        ? ("weekly-summary", weekStart, weekEnd)
        : ("monthly-summary", monthStart, monthEnd),
    ],
    () =>
      timeFrame === "Week"
        ? getStatsExercises(
            weekStart.toISOString(),
            weekEnd.toISOString(),
            activityType
          )
        : getStatsExercises(
            monthStart.toISOString(),
            monthEnd.toISOString(),
            activityType
          )
  );

  const handleTimeFrameChange = (event, newTimeFrame) => {
    if (newTimeFrame) {
      setTimeFrame(newTimeFrame);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 5,
        paddingLeft: 5,
      }}>
      <Typography variant="h3">Statistics</Typography>
      {timeFrame === "Week" ? (
        <ForwardBackwardButtons
          handleForward={() => handleDayChange(7)}
          handleBackward={() => handleDayChange(-7)}
          forwardDisabled={weekEnd > new Date()}
        />
      ) : (
        <ForwardBackwardButtons
          handleForward={() => handleMonthChange(1)}
          handleBackward={() => handleMonthChange(-1)}
          forwardDisabled={monthEnd > new Date()}
        />
      )}
      <ViewToggle
        handleChange={handleTimeFrameChange}
        view={timeFrame}
        options={["Week", "Month"]}
      />
      <Typography variant="h6" sx={{ margin: "16px 0 16px 0" }}>
        {timeFrame === "Week"
          ? `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`
          : `${monthStart.toLocaleDateString()} - ${monthEnd.toLocaleDateString()}`}
      </Typography>

      {isLoading || isFetching ? (
        <CircularProgress />
      ) : isSuccess ? (
        exercises.length > 0 ? (
          <>
            <SummaryChart exercises={exercises} timeFrame={timeFrame} />
            <StatisticsTables data={exercises} />
            <CombinedRouteMap exercises={exercises} />
            <ExerciseCards exerciseData={exercises} />
          </>
        ) : (
          <Typography sx={{ marginTop: 5 }} variant="h6">
            No exercises, log some now or take a time machine!
          </Typography>
        )
      ) : (
        <Typography>Error, we'll get it fixed soon</Typography>
      )}
    </Box>
  );
};

export default StatisticsPage;
