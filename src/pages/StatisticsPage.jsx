import React, { useState } from "react";
import { Box, Typography } from "@mui/material";

import YearSummaryStats from "../components/summarystats/YearSummaryStats";
import NonYearSummaryStats from "../components/summarystats/NonYearSummaryStats";
import ViewToggle from "../components/display/ViewToggle";
const StatisticsPage = () => {
  const [statsView, setStatsView] = useState("by interval");

  const handleStatsViewChange = (event, newStatsView) => {
    if (newStatsView) {
      setStatsView(newStatsView);
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
      <ViewToggle
        handleChange={handleStatsViewChange}
        options={["by interval", "summary"]}
        view={statsView}
      />
      {statsView === "summary" ? <YearSummaryStats /> : <NonYearSummaryStats />}
    </Box>
  );
};

export default StatisticsPage;
