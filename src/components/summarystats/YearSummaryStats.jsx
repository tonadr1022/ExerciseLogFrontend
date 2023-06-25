import { useQuery } from "@tanstack/react-query";
import { getExerciseStats } from "../../api/exercisesApi";
import {
  CircularProgress,
  Box,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import ViewToggle from "../display/ViewToggle";
import { useEffect, useState } from "react";
import SummaryStatsChart from "./SummaryStatsChart";
import YearStatsCard from "./YearStatsCard";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
const thisYear = new Date().getFullYear();
const YearSummaryStats = () => {
  const [timeFrame, setTimeFrame] = useState("month");
  const [year, setYear] = useState(thisYear);
  const { data, isLoading, isSuccess, isFetching } = useQuery(
    ["summaryStats", timeFrame, year],
    () => getExerciseStats(year, timeFrame, "Run")
  );

  const handleTimeFrameChange = (event, newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };
  return (
    <Grid container sx={{ textAlign: "center" }}>
      <Grid item xs={12}>
        <ViewToggle
          handleChange={handleTimeFrameChange}
          options={["week", "month", "year"]}
          view={timeFrame}
          toggleWidth="60%"
          label="Time Interval"
        />
      </Grid>
      {isLoading || isFetching ? (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      ) : isSuccess ? (
        timeFrame !== "year" ? (
          <>
            <Grid item xs={12}>
              <Box
                sx={{
                  mt: 2,
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <IconButton onClick={() => setYear((prevYear) => --prevYear)}>
                  <ArrowBack />
                </IconButton>
                <Typography variant="h5">{year}</Typography>
                <IconButton
                  disabled={year >= thisYear}
                  onClick={() => setYear((prevYear) => ++prevYear)}>
                  <ArrowForward />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  marginLeft: 10,
                  marginRight: 10,
                  display: "flex",
                  justifyContent: "center",
                }}>
                <SummaryStatsChart timeFrame={timeFrame} data={data} />
              </Box>
            </Grid>
          </>
        ) : (
          <Grid item xs={12}>
            <Box
              sx={{
                marginLeft: 10,
                marginRight: 10,
                display: "flex",
                justifyContent: "center",
              }}>
              <YearStatsCard data={data} />
            </Box>
          </Grid>
        )
      ) : (
        <div>error</div>
      )}
    </Grid>
  );
};

export default YearSummaryStats;
