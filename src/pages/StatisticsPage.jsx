import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

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
      }}>
      <Grid container sx={{ textAlign: "center" }} spacing={1} padding={1}>
        <Grid item xs={12}>
          <Typography variant="h3">Statistics</Typography>
        </Grid>

        <Grid item xs={12}>
          <ViewToggle
            toggleWidth="50%"
            handleChange={handleStatsViewChange}
            options={["by interval", "summary"]}
            view={statsView}
            label="View"
          />
        </Grid>
      </Grid>

      {statsView === "summary" ? <YearSummaryStats /> : <NonYearSummaryStats />}
    </Box>
  );
};

export default StatisticsPage;
