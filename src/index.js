import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import axios from 'axios';
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    // mode: "dark",
    background: {
      default: "#463B60",
      paper: "#F4F4F4",
    },

    primary: {
      main: "#31254D",
      light: "#463B60",
      dark: "#31254d",
    },
    secondary: green,
  },
});


//default config axios

axios.defaults.baseURL= 'http://localhost:8000/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
