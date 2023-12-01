// Import necessary dependencies from Material-UI
import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightIcon from "@material-ui/icons/Flight";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    maxWidth: 700,
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
}));

const CheckoutModalEmail = ({
  isOpen,
  onClose,
  totalAmount,
  selectedFlight,
  selectedSeats,
}) => {
  const classes = useStyles();
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [creditCard, setCreditCard] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [totalPrice, setTotalPrice] = useState(totalAmount);
  const [cvv, setCvv] = useState("");
  const [expDate, setExpDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTotalPrice(totalAmount);
  }, [totalAmount]);

  const handleInsuranceChange = () => {
    setInsuranceSelected(!insuranceSelected);
    setTotalPrice((prevTotalPrice) =>
      insuranceSelected ? prevTotalPrice - 10 : prevTotalPrice + 10
    );
  };

  const bookUserFlight = async () => {
    // Prepare the payload
    const payload = {
      name: name,
      email: email,
      seatNumbers: selectedSeats,
      creditCardNum: creditCard,
      cvv: cvv,
      expDate: expDate,
    };

    try {
      // Send the post request with the payload
      const response = await axios.post(
        `http://localhost:8080/api/flights/${selectedFlight.id}/seats/book`,
        payload
      );

      // Check if the request was successful
      if (response.status === 200) {
        // Navigate to the home page or a confirmation page
        navigate("/");
      } else {
        // Handle any other HTTP status codes as needed
        console.error("Error booking flight");
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error booking flight: ", error);
    }
  };

  const handlePayment = () => {
    // Use Regex to validate input
    const emailRegex = /\S+@\S+\.\S+/;
    const creditCardRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;
    const expDateRegex = /^\d{2}\/\d{2}$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    } else if (!creditCardRegex.test(creditCard)) {
      alert("Please enter a valid credit card number.");
      return;
    } else if (!cvvRegex.test(cvv)) {
      alert("Please enter a valid CVV.");
      return;
    } else if (!expDateRegex.test(expDate)) {
      alert("Please enter a valid expiration date.");
      return;
    }
    bookUserFlight();
  };

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
        <div className={classes.paper}>
          <h2>Checkout</h2>
          {selectedFlight && (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                  justifyContent: "center",
                }}
              >
                <FlightTakeoffIcon
                  fontSize="large"
                  style={{ marginRight: "10px" }}
                />
                <Typography variant="subtitle1">
                  {selectedFlight.origin}
                </Typography>
                <FlightIcon
                  fontSize="large"
                  style={{ margin: "0 10px", marginLeft: "30px" }}
                />
                <Typography variant="subtitle1">
                  {selectedFlight.flightNumber}
                </Typography>
                <FlightLandIcon
                  fontSize="large"
                  style={{ margin: "0 10px", marginLeft: "30px" }}
                />
                <Typography variant="subtitle1">
                  {selectedFlight.destination}
                </Typography>
                <AccessTimeIcon
                  fontSize="large"
                  style={{ margin: "0 10px", marginLeft: "30px" }}
                />
                <Typography variant="subtitle1">
                  {selectedFlight.duration}
                </Typography>
              </div>
            </>
          )}
          <p>Selected Seats:</p>
          <div>{selectedSeats}</div>
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
          <TextField
            label="Email"
            variant="outlined"
            className={classes.formControl}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: "20px" }}
          />
          <TextField
            label="Name"
            variant="outlined"
            className={classes.formControl}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Credit Card"
            variant="outlined"
            className={classes.formControl}
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
          />
          <TextField
            label="CVV"
            variant="outlined"
            className={classes.formControl}
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
          <TextField
            label="Expiration Date"
            variant="outlined"
            className={classes.formControl}
            value={expDate}
            onChange={(e) => setExpDate(e.target.value)}
          />
          <p>
            <strong>Total Price:</strong> ${totalPrice}
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            style={{ margin: "0 10px", marginRight: "20px" }}
          >
            Confirm Payment
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

export default CheckoutModalEmail;
