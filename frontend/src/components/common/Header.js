import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Link,
} from "@material-ui/core";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LoginModal from "../LoginModal";
import { AuthContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer", // Add cursor pointer for indicating it's clickable
    // make it smaller width
    width: "fit-content",
  },
  appBar: {
    backgroundColor: "#003366",
  },
}));

export default function Header() {
  const classes = useStyles();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoginOpen, setLoginOpen] = useState(false);

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleTitleClick = () => {
    // Navigate to the home page when the title is clicked
    navigate("/");
  };

  const handleLogoutClick = () => {
    // Perform logout and navigate to the home page
    logout();
    navigate("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            underline="none"
            className={classes.title}
            onClick={handleTitleClick}
          >
            <Typography variant="h6">Moussavi Airlines</Typography>
          </Link>
          {user ? (
            <>
              <Typography variant="h6" style={{ marginRight: "1rem" }}>
                Welcome, {user.username}
              </Typography>
              <Button color="inherit" onClick={handleLogoutClick}>
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
