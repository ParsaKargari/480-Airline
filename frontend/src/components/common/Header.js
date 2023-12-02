import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Link,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import RegisterModal from "../RegisterModal";
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
  const [openNewsDialog, setOpenNewsDialog] = useState(false);

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false); // State for the registration modal

  const handleNewsClick = () => {
    setOpenNewsDialog(true);
  };

  const handleNewsDialogClose = () => {
    setOpenNewsDialog(false);
  };

  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleRegisterOpen = () => {
    setRegisterOpen(true);
  };

  const handleRegisterClose = () => {
    setRegisterOpen(false);
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

  const subscribeToNews = async () => {
    try {
      const userId = user.id;
      const response = await fetch(`/api/accounts/news/${userId}`, {
        method: "GET",
      });
      if (response.ok) {
        console.log("News Sent");
      } else {
        console.log("Error sending news");
      }
    } catch (error) {
      console.error("Error sending news:", error);
    }
    setOpenNewsDialog(false);
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
          {user && user.role === "REGISTERED_USER" && (
            <Button color="inherit" onClick={handleNewsClick}>
              News
            </Button>
          )}
          {user ? (
            <>
              <Typography variant="h6" style={{ marginRight: "1rem" }}>
                Welcome, {user.name}
              </Typography>
              <Button color="inherit" onClick={handleLogoutClick}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={handleLoginOpen}>
                Login
              </Button>
              <Button color="inherit" onClick={handleRegisterOpen}>
                Register
              </Button>
            </>
          )}
          <LoginModal open={isLoginOpen} handleClose={handleLoginClose} />
          <RegisterModal
            open={isRegisterOpen}
            handleClose={handleRegisterClose}
          />
        </Toolbar>
      </AppBar>

      <Dialog open={openNewsDialog} onClose={handleNewsDialogClose}>
        <DialogTitle>Get News Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to receive the latest news and offers from Moussavi
            Airlines?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewsDialogClose} color="primary">
            No
          </Button>
          <Button onClick={subscribeToNews} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
