import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CardActions,
} from '@material-ui/core';

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
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      width: '30%', // This makes the modal width 50% of the screen width on small devices and up
      height: '45%', // This makes the modal height 50% of the screen height on small devices and up
    },
    [theme.breakpoints.down('xs')]: {
      width: '80%', // On extra small devices, the modal width is 80% of the screen width
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(6), // Increased padding for better visual spacing
    outline: 'none', // Removes the focus outline from the modal
    // Center Content
    display: 'flex',
    flexDirection: 'column',

    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  actions: {
    justifyContent: 'flex-end',
  },
}));

export default function LoginModal({ open, handleClose }) {
  const classes = useStyles();
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
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
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
          />
          {/* Add your login logic here */}
        </CardContent>
        <CardActions className={classes.actions}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Login
          </Button>
        </CardActions>
      </Card>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
