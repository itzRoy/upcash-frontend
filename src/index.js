import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    // mode: "dark",
    background: {
      default: "#463B60",
      // paper: "#31254D",
    },

    primary: {
      main: "#31254D",
      light: "#463B60",
      dark: "#31254d",
    },
    secondary: green,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
