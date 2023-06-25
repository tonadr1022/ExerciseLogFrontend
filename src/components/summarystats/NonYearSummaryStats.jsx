import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getExercisesByTimeInterval } from "../../api/exercisesApi";
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import ExerciseCards from "../../components/display/ExerciseCards";
import StatisticsTables from "../../components/summary/StatisticsTables";
import {
  changeDatetimeByDays,
  changeDatetimeByMonths,
} from "../../utils/dateUtils";
import CombinedRouteMap from "../../components/summary/CombinedRouteMap";
import ViewToggle from "../../components/display/ViewToggle";
import SummaryChart from "../../components/summary/SummaryChart";
import { getMostRecentMonday, getMonthStart } from "../../utils/dateUtils";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const mostRecentMonday = getMostRecentMonday();
const monthStartInitial = getMonthStart();
const today = new Date();
const NonYearSummaryStats = () => {
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

  const handleTimeFrameForward = () => {
    if (timeFrame === "Week") {
      handleDayChange(7);
    } else {
      handleMonthChange(1);
    }
  };
  const handleTimeFrameBackward = () => {
    if (timeFrame === "Week") {
      handleDayChange(-7);
    } else {
      handleMonthChange(-1);
    }
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
        ? getExercisesByTimeInterval(
            weekStart.toISOString(),
            weekEnd.toISOString(),
            activityType
          )
        : getExercisesByTimeInterval(
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
    <Grid container sx={{ textAlign: "center" }}>
      <Grid item xs={12}>
        <ViewToggle
          handleChange={handleTimeFrameChange}
          label="Time Frame"
          view={timeFrame}
          options={["Week", "Month"]}
          toggleWidth="50%"
        />
      </Grid>
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <IconButton onClick={handleTimeFrameBackward}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ margin: "16px 0 16px 0" }}>
            {timeFrame === "Week"
              ? `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`
              : `${monthStart.toLocaleDateString()} - ${monthEnd.toLocaleDateString()}`}
          </Typography>
          <IconButton
            disabled={timeFrame === "Week" ? weekEnd > today : monthEnd > today}
            onClick={handleTimeFrameForward}>
            <ArrowForward />
          </IconButton>
        </Box>
      </Grid>
      {isLoading || isFetching ? (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      ) : isSuccess ? (
        exercises.length > 0 ? (
          <>
            <Grid item xs={12}>
              <SummaryChart exercises={exercises} timeFrame={timeFrame} />
            </Grid>
            <Grid item xs={12}>
              <CombinedRouteMap exercises={exercises} />
            </Grid>
            <Grid item xs={12}>
              <StatisticsTables data={exercises} />
            </Grid>
            <Grid item xs={12}>
              <ExerciseCards exerciseData={exercises} />
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Typography sx={{ marginTop: 5 }} variant="h6">
              No exercises, log some now or take a time machine!
            </Typography>
          </Grid>
        )
      ) : (
        <Grid item xs={12}>
          <Typography>Error, we'll get it fixed soon</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default NonYearSummaryStats;
