import { useQuery } from "@tanstack/react-query";
import { getExerciseStats } from "../../api/exercisesApi";
import { CircularProgress, Box, Typography } from "@mui/material";
import ViewToggle from "../display/ViewToggle";
import { useEffect, useState } from "react";
import SummaryStatsChart from "./SummaryStatsChart";
import YearStatsCard from "./YearStatsCard";

const YearSummaryStats = () => {
  const [timeFrame, setTimeFrame] = useState("month");
  const { data, isLoading, isSuccess, isFetching } = useQuery(
    ["summaryStats", timeFrame],
    () => getExerciseStats(2023, timeFrame, "Run")
  );

  const handleTimeFrameChange = (event, newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <ViewToggle
        handleChange={handleTimeFrameChange}
        options={["week", "month", "year"]}
        view={timeFrame}
      />

      {isLoading || isFetching ? (
        <CircularProgress />
      ) : isSuccess ? (
        timeFrame !== "year" ? (
          <SummaryStatsChart timeFrame={timeFrame} data={data} />
        ) : (
          <YearStatsCard data={data} />
        )
      ) : (
        <div>error</div>
      )}
    </Box>
  );
};

export default YearSummaryStats;
