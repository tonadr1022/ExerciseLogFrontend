import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";

const ForwardBackwardButtons = ({
  handleForward,
  handleBackward,
  forwardDisabled,
}) => {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton onClick={handleBackward}>
        <ArrowBack />
      </IconButton>
      <IconButton disabled={forwardDisabled} onClick={handleForward}>
        <ArrowForward />
      </IconButton>
    </Box>
  );
};

export default ForwardBackwardButtons;
