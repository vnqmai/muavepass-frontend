import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#26ce86",
    },
    secondary: {
      main: "#318657",
    },
    text: {
      primary: "#171717",
      secondary: green[800],
    },
    button: {
      active: "#F2F2F2",
    },
    background: {
      topBar: "#fffff",
      footer: "#f7f7f7"
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#26ce86",
    },
    secondary: {
      main: "#318657",
    },
    background: {
      topBar: "#242526",
      footer: "#242526"
    },
    button: {
      active: "#2F3031",
    },
    text: {
      primary: "#ffffff",
      secondary: green[800],

    },
  },
});
