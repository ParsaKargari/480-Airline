// Import necessary dependencies from Material-UI
import React, { useState, useEffect, useContext } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
  Grid,
  Paper,
  Divider,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightIcon from "@material-ui/icons/Flight";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    maxWidth: 800,
    borderRadius: 8,
    textAlign: "center",
  },
  formControl: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  checkbox: {
    marginTop: theme.spacing(2),
  },
  legendItem: {
    marginRight: theme.spacing(1.5),
    marginLeft: theme.spacing(1.5),
    display: "flex",
    alignItems: "center",
  },
  flightInfo: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

const CheckoutModal = ({
  isOpen,
  onClose,
  totalAmount,
  selectedFlight,
  selectedSeats,
}) => {
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [creditCard, setCreditCard] = useState("");
  const [expDateInput, setExpDateInput] = useState("");
  const [cvvInput, setCvvInput] = useState("");
  const [totalPrice, setTotalPrice] = useState(totalAmount);
  const navigate = useNavigate();
  const classes = useStyles();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setTotalPrice(totalAmount);
  }, [totalAmount]);

  const handleInsuranceChange = () => {
    setInsuranceSelected(!insuranceSelected);
    setTotalPrice((prevTotalPrice) =>
      insuranceSelected ? prevTotalPrice - 10 : prevTotalPrice + 10
    );
  };
  const bookFlight = async () => {
    try {
      const flightID = selectedFlight.id; // Adjust this based on how the flight ID is stored
      const selectedSeatsFormatted = selectedSeats.map((seat) =>
        convertSeatFormat(seat)
      );

      const isRegisteredUser = user.role === "REGISTERED_USER";
      const creditCardNum = isRegisteredUser
        ? user.creditCard.number
        : creditCard;
      const cvv = isRegisteredUser ? user.creditCard.cvv : cvvInput;
      const expDate = isRegisteredUser ? user.creditCard.expDate : expDateInput;

      const bookingDetails = {
        name: user.name,
        email: user.email,
        seatNumbers: selectedSeatsFormatted,
        // Remove all spaces in credit card number
        creditCardNum: creditCardNum.replace(/\s/g, ""),
        cvv: cvv,
        expDate: expDate,
      };

      console.log(bookingDetails);

      const response = await fetch(
        `http://localhost:8080/api/flights/${flightID}/seats/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingDetails),
        }
      );

      if (response.ok) {
        const data = await response.json();
        navigate("/");
      } else {
        throw new Error("Failed to book flight");
      }
    } catch (error) {
      console.error("Error booking flight:", error);
    }
  };

  const handlePayment = () => {
    if (isRegisteredUser) {
      bookFlight();
    } else {
      // Check if credit card info is valid
      const creditCardRegex = /^\d{16}$/; // 16 digits
      const cvvRegex = /^\d{3}$/; // 3 digits
      const expDateRegex = /^\d{2}\/\d{2}$/; // MM/YY

      if (
        !creditCardRegex.test(creditCard) ||
        !cvvRegex.test(cvvInput) ||
        !expDateRegex.test(expDateInput)
      ) {
        alert("Invalid credit card information");
        return;
      } else {
        bookFlight();
      }
    }
  };

  const convertSeatFormat = (seatKey) => {
    const seat = seatKey.split("-")[1];
    const row = seatKey.split("-")[0];
    const seatLetter = String.fromCharCode(64 + parseInt(seat));
    return `${seatLetter}${row}`;
  };

  const isRegisteredUser = user.role === "REGISTERED_USER";

  return (
    <Modal
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Paper className={classes.paper}>
          <Typography variant="h4" gutterBottom>
            Checkout
          </Typography>

          {selectedFlight && (
            <Grid
              container
              spacing={2}
              alignItems="center"
              className={classes.flightInfo}
              justify="center"
            >
              <Grid item>
                <FlightTakeoffIcon fontSize="large" />
              </Grid>
              <Grid item>
                <Typography>{selectedFlight.origin}</Typography>
              </Grid>
              <Grid item>
                <FlightIcon fontSize="large" />
              </Grid>
              <Grid item>
                <Typography>{selectedFlight.flightNo}</Typography>
              </Grid>
              <Grid item>
                <FlightLandIcon fontSize="large" />
              </Grid>
              <Grid item>
                <Typography>{selectedFlight.destination}</Typography>
              </Grid>
              <Grid item>
                <AccessTimeIcon fontSize="large" />
              </Grid>
              <Grid item>
                <Typography>{selectedFlight.duration}</Typography>
              </Grid>
            </Grid>
          )}

          <Divider className={classes.divider} />

          <Typography variant="subtitle1">
            Selected Seats:{" "}
            {selectedSeats.map(convertSeatFormat).join(", ") ||
              "No seats selected"}
          </Typography>

          <FormControlLabel
            control={
              <Checkbox
                checked={insuranceSelected}
                onChange={handleInsuranceChange}
                name="insurance"
                color="primary"
              />
            }
            label="Ticket Cancellation Insurance (+$10)"
          />

          {isRegisteredUser ? (
            <Typography variant="body1" color="secondary">
              Your company's credit card will be used for this transaction.
            </Typography>
          ) : (
            <>
              <TextField
                label="Credit Card Number"
                variant="outlined"
                className={classes.formControl}
                value={creditCard}
                onChange={(e) => setCreditCard(e.target.value)}
              />
              <TextField
                label="CVV"
                variant="outlined"
                className={classes.formControl}
                value={cvvInput}
                onChange={(e) => setCvvInput(e.target.value)}
              />
              <TextField
                label="Expiration Date"
                variant="outlined"
                className={classes.formControl}
                value={expDateInput}
                onChange={(e) => setExpDateInput(e.target.value)}
              />
            </>
          )}

          <Typography variant="h6">Total Price: ${totalPrice}</Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            style={{ margin: "16px 8px" }}
          >
            Confirm Payment
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default CheckoutModal;
