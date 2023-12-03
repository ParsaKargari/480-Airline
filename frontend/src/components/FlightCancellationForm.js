// src/components/FlightCancellationForm.js
import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  makeStyles,
  Snackbar,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputField: {
    margin: theme.spacing(1, 0),
    width: "100%", // Full width
  },
  submitButton: {
    margin: theme.spacing(2, 0),
  },
}));

const FlightCancellationForm = ({ flights }) => {
  const [transactionId, setTransactionId] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [flightNo, setFlightNo] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();

  const findFlightId = (flightNo) => {
    console.log(flights);
    const flight = flights.find((flight) => flight.flightNo === flightNo);
    return flight ? flight.id : null;
  };

  const handleCancelTicket = async (transactionId) => {
    try {
      const flightId = findFlightId(flightNo);
      console.log(flightId);
      const payload = {
        paymentId: transactionId,
      };
      const response = await fetch(
        `http://localhost:8080/api/flights/${flightId}/cancel-flight`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setSnackbarMessage("Flight cancelled successfully");
        navigate("/");
      } else {
        const errorData = await response.json();
        setSnackbarMessage(errorData.message || "Failed to cancel flight");
      }
    } catch (error) {
      console.error("Error cancelling flight:", error);
      setSnackbarMessage("Error occurred during cancellation");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCancelTicket(transactionId);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
        Cancel Your Flight
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Transaction ID"
          variant="outlined"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className={classes.inputField}
        />
        <TextField
          label="Flight Number"
          variant="outlined"
          value={flightNo}
          onChange={(e) => setFlightNo(e.target.value)}
          className={classes.inputField}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.submitButton}
        >
          Cancel Flight
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Paper>
  );
};

export default FlightCancellationForm;
