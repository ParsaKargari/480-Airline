// src/index.js

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import RedirectToMainPage from "./components/common/RedirectToMainpage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#003366", // Navy Blue
    },
    secondary: {
      main: "#0D47A1", // Blue
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RedirectToMainPage />
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
