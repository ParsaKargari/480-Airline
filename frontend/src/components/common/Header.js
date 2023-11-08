// src/components/common/Header.js

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import LoginModal from "../LoginModal"; // Ensure this path is correct

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#003366", // Navy Blue color
  },
}));

export default function Header() {
  const classes = useStyles();
  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
    console.log("Login Opened");
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            POSD Airline
          </Typography>
          <Button color="inherit" onClick={handleLoginOpen}>Login</Button>
          <LoginModal open={isLoginOpen} handleClose={handleLoginClose} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
