// React and Third-Party Libraries
import React from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ThemeProvider } from "@mui/material/styles";

// Theme
import theme from "../../../themes/muiTheme";

/**
 * Toggle button component using Material-UI Switch with custom colors.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isActive - Flag indicating whether the toggle is active.
 * @param {function} props.onChange - Function to handle toggle change event.
 * @returns {JSX.Element} React component.
 */
const ToggleButton = ({ isActive, onChange }) => {
  return (
    <ThemeProvider theme={theme}>
      <FormControlLabel
        value='bottom'
        control={
          <Switch checked={isActive} onChange={onChange} defaultChecked />
        }
      />
    </ThemeProvider>
  );
};

export default ToggleButton;
