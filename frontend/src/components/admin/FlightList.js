import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  filterSection: {
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginBottom: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(2),
  },
  dialogContent: {
    minWidth: "400px",
  },
  formControl: {
    minWidth: 120,
    marginTop: theme.spacing(2),
  },
}));

const FlightList = () => {
  const classes = useStyles();
  const [flights, setFlights] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState(null);
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [aircrafts, setAircrafts] = useState([]);
  const [aircraft, setAircraft] = useState(null);
  const [selectedAircraftId, setSelectedAircraftId] = useState("");

  useEffect(() => {
    fetchFlights();
    fetchAircrafts();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/flights");
      if (response.ok) {
        const data = await response.json();
        setFlights(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addOrUpdateFlight = async (flight) => {
    const url = flight.id
      ? `http://localhost:8080/api/flights/${flight.id}` // Edit existing flight
      : "http://localhost:8080/api/flights"; // Add new flight

    try {
      const response = await fetch(url, {
        method: flight.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flight),
      });

      if (response.ok) {
        fetchFlights(); // Refresh flights list
      } else {
        console.error("Failed to save flight");
      }
    } catch (error) {
      console.error("Error saving flight:", error);
    }
  };

  // Delete flight
  const deleteFlight = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/flights/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchFlights(); // Refresh flights list
      } else {
        console.error("Failed to delete flight");
      }
    } catch (error) {
      console.error("Error deleting flight:", error);
    }
  };

  const fetchAircrafts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/aircraft");
      if (response.ok) {
        const data = await response.json();
        setAircrafts(data);
      }
    } catch (error) {
      console.error("Error fetching aircrafts:", error);
    }
  };

  const handleAircraftChange = (event) => {
    const aircraftId = event.target.value;
    setSelectedAircraftId(aircraftId);
    const selectedAircraft = aircrafts.find((a) => a.id === aircraftId);
    if (selectedAircraft) {
      setCurrentFlight({
        ...currentFlight,
        aircraft: selectedAircraft,
      });
    }
    setAircraft(selectedAircraft);
  };

  const isFormValid = () => {
    // Check if all required fields are filled
    return (
      currentFlight &&
      currentFlight.flightNo &&
      currentFlight.origin &&
      currentFlight.destination &&
      currentFlight.departureDate &&
      currentFlight.duration &&
      currentFlight.aircraft
    );
  };

  const handleStartDateChange = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setFilterEndDate(event.target.value);
  };

  const filterFlights = () => {
    return flights.filter((flight) => {

      // Parse the departure date of the flight
      const [day, month, year] = flight.departureDate.split("-");
      const flightDate = new Date(year, month - 1, day); // Month index is 0-based in JavaScript

      // Parse the filter start and end dates
      const startDate = filterStartDate
        ? new Date(filterStartDate)
        : new Date(-8640000000000000);
      const endDate = filterEndDate
        ? new Date(filterEndDate)
        : new Date(8640000000000000);

      // Return true if the flight date is within the specified range
      return flightDate >= startDate && flightDate <= endDate;
    });
  };

  const filteredFlights = filterFlights();

  const openDialog = (flight) => {
    setCurrentFlight(
      flight || {
        flightNo: "",
        origin: "",
        duration: "",
        destination: "",
        departureDate: "",
      }
    );
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setCurrentFlight(null);
  };

  const handleSave = () => {
    if (currentFlight) {
      const formattedDate = currentFlight.departureDate
        .split("-")
        .reverse()
        .join("-");
      const flightData = {
        ...currentFlight,
        departureDate: formattedDate,
        aircraft: {
          model: aircraft?.model,
          capacity: aircraft?.capacity,
          airline: aircraft?.airline,
          tailNumber: aircraft?.tailNumber,
        },
        crew: [], 
        seats: [], 
      };
      addOrUpdateFlight(flightData);
    }
    closeDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      deleteFlight(id);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.filterSection}>
        <Grid item>
          <TextField
            label="Filter Start Date"
            type="date"
            value={filterStartDate}
            onChange={handleStartDateChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Filter End Date"
            type="date"
            value={filterEndDate}
            onChange={handleEndDateChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={() => openDialog({})}
        className={classes.addButton}
      >
        Add New Flight
      </Button>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Flight #</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Departure Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Aircraft</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFlights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.id}</TableCell>
                <TableCell>{flight.flightNo}</TableCell>
                <TableCell>{flight.origin}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{flight.departureDate}</TableCell>
                <TableCell>{flight.duration}</TableCell>
                <TableCell>{flight.aircraft.model}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => openDialog(flight)}>
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(flight.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>
          {currentFlight?.id ? "Edit Flight" : "Add Flight"}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {!currentFlight?.id && (
            <FormControl className={classes.formControl} fullWidth>
              <InputLabel id="aircraft-label">Aircraft</InputLabel>
              <Select
                labelId="aircraft-select-label"
                id="aircraft-select"
                value={selectedAircraftId}
                onChange={handleAircraftChange}
                disabled={!!currentFlight?.id}
              >
                {aircrafts.map((aircraft) => (
                  <MenuItem key={aircraft.id} value={aircraft.id}>
                    {aircraft.model} - {aircraft.airline} -{" "}
                    {aircraft.tailNumber}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Flight Number"
            type="text"
            fullWidth
            value={currentFlight?.flightNo || ""}
            onChange={(e) =>
              setCurrentFlight({ ...currentFlight, flightNo: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Origin"
            type="text"
            fullWidth
            value={currentFlight?.origin || ""}
            onChange={(e) =>
              setCurrentFlight({ ...currentFlight, origin: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Destination"
            type="text"
            fullWidth
            value={currentFlight?.destination || ""}
            onChange={(e) =>
              setCurrentFlight({
                ...currentFlight,
                destination: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Duration"
            type="text"
            fullWidth
            value={currentFlight?.duration || ""}
            onChange={(e) =>
              setCurrentFlight({ ...currentFlight, duration: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Departure Date"
            type="date"
            fullWidth
            value={currentFlight?.departureDate || ""}
            onChange={(e) =>
              setCurrentFlight({
                ...currentFlight,
                departureDate: e.target.value,
              })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FlightList;
