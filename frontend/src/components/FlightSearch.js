// src/components/FlightSearch.js

import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Snackbar,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import { AuthContext } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
  card: {
    width: "100%",
    maxWidth: 600,
    padding: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

// Mock flight data
const mockFlights = [
  { id: 1, label: "Flight A to New York" },
  { id: 2, label: "Flight B to Los Angeles" },
  { id: 3, label: "Flight C to Miami" },
  { id: 4, label: "Flight D to Chicago" },
  { id: 5, label: "Flight E to San Francisco" },
  { id: 6, label: "Flight F to Seattle" },
  { id: 7, label: "Flight G to Boston" },
  { id: 8, label: "Flight H to Washington D.C." },
  { id: 9, label: "Flight I to Las Vegas" },
  { id: 10, label: "Flight J to Denver" },
  { id: 11, label: "Flight K to San Diego" },
  { id: 12, label: "Flight L to Honolulu" },
];

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FlightSearch() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    // Here you would handle the actual search logic
    const searchResults = mockFlights.find(
      (flight) => flight.label === searchTerm
    );

    if (!searchResults) {
      setOpenSnackbar(true);
    } else {
      console.log("Selected flight:", searchResults);

      if (user && user.role === "Admin") {
        navigate("/admin-dashboard", {
          state: { selectedFlight: searchResults },
        });
      } else if (user && user.role === "AirAgent") {
        navigate("/air-agent-dashboard", {
          state: { selectedFlight: searchResults },
        });
      } else if (user && user.role === "TourAgent") {
        navigate("/tour-agent-dashboard", {
          state: { selectedFlight: searchResults },
        });
      } else {
        navigate("/default-dashboard", {
          state: { selectedFlight: searchResults },
        });
      }
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Find a Flight
          </Typography>
          <Autocomplete
            freeSolo
            id="flight-search"
            disableClearable
            options={mockFlights.map((option) => option.label)}
            onInputChange={(event, newInputValue) => {
              setSearchTerm(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search for flights"
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
          <Button
            className={classes.button}
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={!user}
          >
            {user ? "Search" : "Login to Book Flight"}
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="warning">
          No flights found for your search.
        </Alert>
      </Snackbar>
    </Box>
  );
}
