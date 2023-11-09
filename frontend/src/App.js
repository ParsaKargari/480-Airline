// src/App.js

import React from "react";
import HomePage from "./components/HomePage";
import { makeStyles } from "@material-ui/core";
import {AuthProvider} from "./components/contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AuthProvider>
        <HomePage />
      </AuthProvider>

      {/* Footer component will now be pushed to the bottom */}
    </div>
  );
}

export default App;
