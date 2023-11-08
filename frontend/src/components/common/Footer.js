// src/components/common/Footer.js

import React from "react";
import { Typography, Link, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Airline Company
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
        Flight Reservation System
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  );
}
