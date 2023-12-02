// src/components/FlightSearch.js

import React, { useState, useContext, useEffect } from "react";
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
import Drawer from "@material-ui/core/Drawer";
import FlightCancellationForm from "./FlightCancellationForm";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function FlightSearch() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/flights");
      if (response.ok) {
        const data = await response.json();
        setFlights(data);
      } else {
        throw new Error("Failed to fetch flights");
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      // Handle errors here
    }
  };

  const handleSearch = () => {
    // Here you would handle the actual search logic
    const searchResults = flights.find(
      (flight) =>
        flight.flightNo +
          " - Origin: " +
          flight.origin +
          " - Destination: " +
          flight.destination ===
        searchTerm
    );

    if (!searchResults) {
      setOpenSnackbar(true);
    } else {
      if (user && user.role === "ADMIN") {
        navigate("/air-agent-dashboard", {
          state: { selectedFlight: searchResults },
        });
      } else if (user && user.role === "AIRLINE_AGENT") {
        navigate("/air-agent-dashboard", {
          state: { selectedFlight: searchResults },
        });
      } else if (user && user.role === "FLIGHT_ATTENDANT") {
        navigate("/air-agent-dashboard", {
          state: { selectedFlight: searchResults },
        });
      } else if (user && user.role === "TOUR_AGENT") {
        navigate("/air-agent-dashboard", {
          state: { selectedFlight: searchResults },
        });
      } else {
        navigate("/default-dashboard", {
          state: { selectedFlight: searchResults },
        });
      }
    }
  };

  const handleSearchAdmin = () => {
    // Navigate to admin dashboard
    navigate("/admin-dashboard");
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const adminCheck = () => {
    // Return true if user role is admin
    // Return false if user role is not admin
    if (user && user.role === "ADMIN") {
      return true;
    }
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
            options={flights.map(
              (flight) =>
                flight.flightNo +
                " - Origin: " +
                flight.origin +
                " - Destination: " +
                flight.destination
            )}
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
            disabled={!user}
            onClick={handleSearch}
          >
            {user ? "Search" : "Login to Book Flight"}
          </Button>
          {adminCheck() && (
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSearchAdmin}
            >
              Admin Dashboard
            </Button>
          )}
          <Button
            className={classes.button}
            fullWidth
            variant="outlined"
            onClick={toggleDrawer(true)}
          >
            Cancel Flight
          </Button>
        </CardContent>
      </Card>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <FlightCancellationForm flights={flights}  />
      </Drawer>
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
