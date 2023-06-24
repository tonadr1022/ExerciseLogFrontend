/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
const style = {
  borderColor: (theme) => theme.palette.secondary.main,
  borderWidth: "2px",
  borderStyle: "solid",
  "&:hover": {
    borderWidth: "2px",
  },
};
const ViewToggle = ({ handleChange, view, options }) => {
  return (
    <ToggleButtonGroup
      color="secondary"
      value={view}
      exclusive
      fullWidth
      onChange={handleChange}>
      {options.map((option) => (
        <ToggleButton key={option} sx={style} value={option}>
          {option}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ViewToggle;
