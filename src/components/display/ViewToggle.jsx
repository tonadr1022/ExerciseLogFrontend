/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
const style = {
  borderColor: (theme) => theme.palette.secondary.main,
  borderWidth: "2px",
  borderStyle: "solid",
  "&:hover": {
    borderWidth: "2px",
  },
};
const ViewToggle = ({ handleChange, view, options, toggleWidth, label }) => {
  return (
    <>
      {label && <Typography variant="body1">{label}</Typography>}
      <ToggleButtonGroup
        color="secondary"
        value={view}
        exclusive
        fullWidth
        sx={{
          width: toggleWidth ? toggleWidth : "100%",
          justifyContent: "center",
        }}
        onChange={handleChange}>
        {options.map((option) => (
          <ToggleButton key={option} sx={style} value={option}>
            {option}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </>
  );
};

export default ViewToggle;
