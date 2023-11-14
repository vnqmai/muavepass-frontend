import { createTheme } from "@mui/material";
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#5d5fef",
    },
    secondary: {
      main: "#318657",
    },
    text: {
        primary: "#171717",
    },
    background: {
        topBar: "#fffff"
    }
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5d5fef",
    },
    secondary: {
      main: "#318657",
    },
    background: {
        topBar: "#242526"
    },
    text: {
        primary: "#ffffff",
    },
  },
  
});
