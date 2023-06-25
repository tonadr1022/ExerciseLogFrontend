import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import { toDurationStringFromSeconds } from "../../utils/formatContent";

const YearStatsCard = ({ data }) => {
  console.log(data);
  return (
    <Card elevation={10}>
      <CardContent>
        <Typography align="center" variant="h3" component="h3">
          {data.year}
        </Typography>

        <Typography align="center" variant="h4">
          Totals
        </Typography>
        <Typography align="center" variant="h6">
          {Math.round(data.total_distance)} mi
        </Typography>
        <Typography align="center" variant="h6">
          {Math.round(data.total_calories)} calories
        </Typography>

        <Typography align="center" variant="h6">
          {toDurationStringFromSeconds(data.total_duration)}
        </Typography>
        <Typography align="center" variant="h6">
          Longest {data.act_type}: {data.max_distance} mi
        </Typography>
      </CardContent>
    </Card>
  );
};

export default YearStatsCard;
