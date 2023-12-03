import React, { useState, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CardActions,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { AuthContext } from "./contexts/AuthContext";
import axios from "axios";

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
      width: "30%",
      height: "fit-content", 
    },
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      height: "fit-content", 
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6),
    outline: "none",
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

export default function RegisterModal({ open, handleClose }) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [wantToRegister, setWantToRegister] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [registrationResult, setRegistrationResult] = useState(null);

  // reset form on close
  React.useEffect(() => {
    if (!open) {
      setUsername("");
      setPassword("");
      setName("");
      setEmail("");
      setDob("");
      setAddress("");
      setWantToRegister(false);
    }
  }, [open]);

  const handleRegisterClick = async () => {
    const userInfo = {
      username,
      password,
      name,
      email,
      address,
      dob,
      role: wantToRegister ? "REGISTERED_USER" : "USER",
    };

    let creditCard = {};
    if (wantToRegister) {
      creditCard = {
        cardHolder: name,
        billingAddress: address,
      };
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/accounts/register",
        { userInfo, creditCard }
      );
      setRegistrationResult(response.data);
      handleClose();
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Registration failed:", error);
      setSnackbarOpen(true);
      setRegistrationResult(null);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Card>
        <CardContent className={classes.content}>
          <Typography variant="h5" component="h2" gutterBottom>
            Register
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dob"
            label="Date of Birth"
            name="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={wantToRegister}
                onChange={(e) => setWantToRegister(e.target.checked)}
                color="primary"
              />
            }
            label="I want to be a registered user"
          />
        </CardContent>
        <CardActions className={classes.actions}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleRegisterClick}
            color="primary"
            disabled={
              !username ||
              !password ||
              !name ||
              !email ||
              !dob ||
              !address ||
              (wantToRegister && (!name || !address)) 
            }
          >
            Register
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
        open={snackbarOpen}
        autoHideDuration={20000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={registrationResult ? "success" : "error"}
        >
          {registrationResult
            ? `Registered successfully! Token: ${registrationResult.token}`
            : "Registration failed"}
          {registrationResult && registrationResult.creditCard && (
            <div>
              <div>
                Credit Card Number: {registrationResult.creditCard.number}
              </div>
              <div>Expiry Date: {registrationResult.creditCard.expDate}</div>
              <div>CVV: {registrationResult.creditCard.cvv}</div>
            </div>
          )}
        </Alert>
      </Snackbar>
    </>
  );
}
