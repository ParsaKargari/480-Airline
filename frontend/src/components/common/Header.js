// src/components/common/Header.js

import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import LoginModal from "../LoginModal"; // Ensure this path is correct
import { AuthContext } from "../contexts/AuthContext";

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
  const { user, logout } = useContext(AuthContext);

  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Moussavi Airlines
          </Typography>
          {user ? (
            <>
              <Typography variant="h6" style={{ marginRight: "1rem" }}>
                Welcome, {user.username}
              </Typography>
              <Button
                color="inherit"
                onClick={logout}
                style={{ marginRight: "1rem" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLoginOpen}>
              Login
            </Button>
          )}
          <LoginModal open={isLoginOpen} handleClose={handleLoginClose} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
