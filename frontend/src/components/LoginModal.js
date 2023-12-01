import React, { useState, useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import Modal from "@material-ui/core/Modal";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CardActions,
} from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    [theme.breakpoints.up("sm")]: {
      width: "30%", // This makes the modal width 50% of the screen width on small devices and up
      height: "45%", // This makes the modal height 50% of the screen height on small devices and up
    },
    [theme.breakpoints.down("xs")]: {
      width: "80%", // On extra small devices, the modal width is 80% of the screen width
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6), // Increased padding for better visual spacing
    outline: "none", // Removes the focus outline from the modal
    // Center Content
    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

export default function LoginModal({ open, handleClose }) {
  const classes = useStyles();
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(""); // New state for token
  const [snackbarOpenSuccess, setSnackbarOpenSuccess] = useState(false);
  const [snackbarOpenFailure, setSnackbarOpenFailure] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  // Reset states when handleClose is called
  React.useEffect(() => {
    if (!open) {
      setUsername("");
      setPassword("");
      setToken("");
      setLoginSuccessful(false);
    }
  }, [open]);

  const handleLoginClick = async () => {
    let success = false;
    if (token) {
      // Token-based login (adjust as per your login method)
      success = await login(null, null, token);
    } else {
      // Username/password login (adjust as per your login method)
      success = await login(username, password);
    }

    setLoginSuccessful(true);
    if (success) {
      setSnackbarOpenSuccess(true);
      handleClose();
    } else {
      // Handle login failure
      setLoginSuccessful(false);
      setSnackbarOpenFailure(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpenFailure(false);
    setSnackbarOpenSuccess(false);
  };

  const [modalStyle] = React.useState(getModalStyle);
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Card>
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h2" gutterBottom>
            Login
          </Typography>
          <TextField
            margin="normal"
            required={!token}
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            disabled={!!token}
          />
          <TextField
            margin="normal"
            required={!token}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!!token}
          />
          <TextField
            margin="normal"
            fullWidth
            name="token"
            label="Token (optional)"
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={!!(username || password)}
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleLoginClick}
            color="primary"
            disabled={(!username || !password) && !token} // Updated condition
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <Snackbar
        open={snackbarOpenSuccess}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={"success"}>
          {`Logged in!`}
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackbarOpenFailure}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={"error"}>
          {"Login failed"}
        </Alert>
      </Snackbar>

    </>
  );
}
