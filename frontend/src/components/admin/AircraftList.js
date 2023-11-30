import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import axios from "axios";

const AircraftList = () => {
  const [aircrafts, setAircrafts] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAircraft, setCurrentAircraft] = useState({
    model: "",
    capacity: "",
    tailNumber: "",
    airline: "",
  });

  // Fetch all aircrafts from the database on initial render
  useEffect(() => {
    fetchAircrafts();
  }, []);

  const fetchAircrafts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/aircraft");
      setAircrafts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Add a new aircraft to the database
  const addAircraft = async (aircraft) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/aircraft",
        aircraft
      );
      fetchAircrafts();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete an aircraft from the database
  const deleteAircraft = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/aircraft/${id}`
      );
      fetchAircrafts();
    } catch (error) {
      console.error(error);
    }
  };

  const openDialog = () => {
    setCurrentAircraft({
      model: "",
      capacity: "",
      tailNumber: "",
      airline: "",
    });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    // TODO: Save currentAircraft to the database
    addAircraft(currentAircraft);
    closeDialog();
  };

  const handleDelete = (id) => {
    // TODO: Delete aircraft with the given id from the database
    deleteAircraft(id);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={openDialog}>
        Add Aircraft
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Tail Number</TableCell>
              <TableCell>Airline</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aircrafts.map((aircraft) => (
              <TableRow key={aircraft.id}>
                <TableCell>{aircraft.id}</TableCell>
                <TableCell>{aircraft.model}</TableCell>
                <TableCell>{aircraft.capacity}</TableCell>
                <TableCell>{aircraft.tailNumber}</TableCell>
                <TableCell>{aircraft.airline}</TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(aircraft.id)}
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
        <DialogTitle>Add Aircraft</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Model"
            type="text"
            fullWidth
            value={currentAircraft.model}
            onChange={(e) =>
              setCurrentAircraft({ ...currentAircraft, model: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Capacity"
            type="integer"
            fullWidth
            value={currentAircraft.capacity}
            onChange={(e) =>
              setCurrentAircraft({
                ...currentAircraft,
                capacity: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Tail Number"
            type="text"
            fullWidth
            value={currentAircraft.tailNumber}
            onChange={(e) =>
              setCurrentAircraft({
                ...currentAircraft,
                tailNumber: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Airline"
            type="text"
            fullWidth
            value={currentAircraft.airline}
            onChange={(e) =>
              setCurrentAircraft({
                ...currentAircraft,
                airline: e.target.value,
              })
            }
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
    </>
  );
};

export default AircraftList;
