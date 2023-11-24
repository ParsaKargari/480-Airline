// Import necessary dependencies from Material-UI
import React, { useState } from "react";
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

const CheckoutModal = ({
  isOpen,
  onClose,
  totalAmount,
  selectedFlight,
  selectedSeats,
}) => {
  console.log("Selected Flight: " + selectedFlight);
  console.log("Selected Seats: " + selectedSeats);
  console.log("Total Amount: " + totalAmount);
  const classes = useStyles();
  const [insuranceSelected, setInsuranceSelected] = useState(false);
  const [creditCard, setCreditCard] = useState("");
  const [totalPrice, setTotalPrice] = useState(totalAmount);

  const handleInsuranceChange = () => {
    setInsuranceSelected(!insuranceSelected);
    if (!insuranceSelected) {
      setTotalPrice(totalPrice + 10);
    } else {
      setTotalPrice(totalPrice - 10);
    }
  };

  const handlePayment = () => {
    // Implement your payment logic here
    if (creditCard.trim() === "") {
      alert("Please enter credit card information.");
    } else {
      // This is just a placeholder
      alert("Payment Successful!");
      onClose(); // Close the modal after successful payment
    }
  };

  const convertSeatFormat = (seatKey) => {
    const seat = seatKey.split("-")[1];
    const row = seatKey.split("-")[0];
    const seatLetter = String.fromCharCode(64 + parseInt(seat));
    return `${seatLetter}${row}`;
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
              <p>Selected Flight:</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
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
          <div>
            {Array.isArray(selectedSeats) && selectedSeats.length > 0 ? (
              selectedSeats.map((seat, index) => (
                <span key={seat}>
                  {index === selectedSeats.length - 1
                    ? convertSeatFormat(seat)
                    : convertSeatFormat(seat) + ", "}
                </span>
              ))
            ) : (
              <span>No seats selected</span>
            )}
          </div>
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
          <p>Make payment, using a credit card.</p>
          <TextField
            label="Credit Card"
            variant="outlined"
            className={classes.formControl}
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
          />
          <p>
            <strong>Total Price:</strong> ${totalPrice}
          </p>
          <Button variant="contained" color="primary" onClick={handlePayment} style={{ margin: "0 10px", marginRight: "20px" }}>
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

export default CheckoutModal;
