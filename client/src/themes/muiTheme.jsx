import { createTheme } from "@mui/material/styles";

const themeMui = createTheme({
  palette: {
    primary: {
      light: "#67cae3",
      main: "#559cad",
      dark: "#416469",
      contrastText: "#fff",
    },
    error: {
      light: "#f7cfbf",
      main: "#ef946c",
      dark: "#d55c22",
      contrastText: "#fff",
    },
    grey: {
      light: "#b8bacd",
      main: "#454372",
      dark: "#5c5e6f",
      contrastText: "#fff",
    },
  },
});

export default themeMui;
