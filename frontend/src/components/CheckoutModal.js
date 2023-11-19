// Import necessary dependencies from Material-UI
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";


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
    maxWidth: 400,
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

}));

const CheckoutModal = ({ isOpen, onClose, totalAmount }) => {
  const classes = useStyles();

  const handleInsuranceChange = () => {
    // Implement your logic for insurance selection here
  };

  const handlePayment = () => {
    // Implement your payment logic here
    // This is just a placeholder
    alert("Payment Successful!");
    onClose(); // Close the modal after successful payment
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
          <p>
            Select the desired ticket cancellation insurance, if interested.
          </p>
          <label>
            <input
              type="checkbox"
              // Implement checked logic here
              onChange={handleInsuranceChange}
            />
            Ticket Cancellation Insurance (+$10)
          </label>
          <p>
            Make payment, using a credit card. (Add your credit card input form
            here)
          </p>
          <p>Receive ticket via email.</p>
          <p>Receive receipt for their payments via email.</p>
          <p>
            <strong>Total Price:</strong> ${totalAmount}
          </p>
          <Button variant="contained" color="primary" onClick={handlePayment}>
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
