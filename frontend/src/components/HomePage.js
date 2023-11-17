// src/components/HomePage.js

import React from "react";
import { Container, Typography, Paper, makeStyles } from "@material-ui/core";
import FlightSearch from "./FlightSearch";

const useStyles = makeStyles((theme) => ({
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
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.searchContainer}>
        <FlightSearch />
      </div>
      <Container maxWidth="lg">
        {/* Hero unit */}
        <Paper className={classes.mainFeaturedPost}>
          {/* Increase the priority of the hero background image */}
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
    </>
  );
}
