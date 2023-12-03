// src/components/HomePage.js

import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  makeStyles,
  Button,
  Drawer,
} from "@material-ui/core";
import FlightSearch from "./FlightSearch";
import FlightCancellationForm from "./FlightCancellationForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  searchContainer: {
    marginBottom: theme.spacing(6),
  },
  drawerButton: {
    marginTop: theme.spacing(2),
  },
}));

export default function HomePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <FlightSearch />
      </div>
      <Container maxWidth="lg">
        <Paper className={classes.mainFeaturedPost}>
          {
            <img
              style={{ display: "none" }}
              src="https://source.unsplash.com/random"
              alt="background"
            />
          }
          <div className={classes.overlay} />
          <Container maxWidth="sm">
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                Find & Book The Best Flights
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Start your journey with us. Comfort and quality on every flight.
              </Typography>
            </div>
          </Container>
        </Paper>
      </Container>
    </div>
  );
}
