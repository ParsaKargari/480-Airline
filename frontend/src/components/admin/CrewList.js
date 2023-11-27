import React, { useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";

const mockCrews = [
  // Flight A
  { id: "CR001", name: "Alice Johnson", role: "Pilot", flight: "FL001" },
  { id: "CR002", name: "Bob Smith", role: "Pilot", flight: "FL001" },
  {
    id: "CR003",
    name: "Charlie Brown",
    role: "Flight Attendant",
    flight: "FL001",
  },
  // Flight B
  { id: "CR004", name: "Alice Johnson2", role: "Pilot", flight: "FL002" },
  { id: "CR005", name: "Bob Smith2", role: "Pilot", flight: "FL002" },
  {
    id: "CR006",
    name: "Charlie Brown2",
    role: "Flight Attendant",
    flight: "FL002",
  },
  // Flight C
  { id: "CR007", name: "Alice Johnson3", role: "Pilot", flight: "FL003" },
  { id: "CR008", name: "Bob Smith3", role: "Pilot", flight: "FL003" },
  {
    id: "CR009",
    name: "Charlie Brown3",
    role: "Flight Attendant",
    flight: "FL003",
  },

  // ... more mock crew members
];

const mockFlights = [
  { id: "FL001", label: "Flight A", origin: "City X", destination: "City Y" },
  { id: "FL002", label: "Flight B", origin: "City X", destination: "City Z" },
  { id: "FL003", label: "Flight C", origin: "City Y", destination: "City Z" },
  // ... more mock flights
];

const CrewList = () => {
  const [crews, setCrews] = useState(mockCrews);
  const [selectedFlight, setSelectedFlight] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentCrew, setCurrentCrew] = useState({
    id: "",
    name: "",
    role: "",
    flight: "",
  });

  const handleFlightChange = (event) => {
    setSelectedFlight(event.target.value);
  };

  const openDialog = (crew = { id: "", name: "", role: "", flight: "" }) => {
    setCurrentCrew(crew);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    if (currentCrew.id) {
      // Edit mode
      setCrews(
        crews.map((crew) => (crew.id === currentCrew.id ? currentCrew : crew))
      );
    } else {
      // Add mode
      const newCrew = { ...currentCrew, id: `CR${crews.length + 1}` };
      setCrews([...crews, newCrew]);
    }
    closeDialog();
  };

  const handleDelete = (id) => {
    setCrews(crews.filter((crew) => crew.id !== id));
  };

  const filteredCrews = selectedFlight
    ? crews.filter((crew) => crew.flight === selectedFlight)
    : crews;

  return (
    <>
      <FormControl style={{ minWidth: 200, marginBottom: "20px" }}>
        <InputLabel id="select-flight-label">Filter by Flight</InputLabel>
        <Select
          labelId="select-flight-label"
          value={selectedFlight}
          onChange={handleFlightChange}
        >
          {mockFlights.map((flight) => (
            <MenuItem key={flight.id} value={flight.id}>
              {flight.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={() => openDialog()}>
        Add Crew
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Flight</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCrews.map((crew) => (
              <TableRow key={crew.id}>
                <TableCell>{crew.id}</TableCell>
                <TableCell>{crew.name}</TableCell>
                <TableCell>{crew.role}</TableCell>
                <TableCell>{crew.flight}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => openDialog(crew)}>
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(crew.id)}
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
          {currentCrew.id ? "Edit Crew Member" : "Add Crew Member"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={currentCrew.name}
            onChange={(e) =>
              setCurrentCrew({ ...currentCrew, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            value={currentCrew.role}
            onChange={(e) =>
              setCurrentCrew({ ...currentCrew, role: e.target.value })
            }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-crew-flight-label">Flight</InputLabel>
            <Select
              labelId="select-crew-flight-label"
              value={currentCrew.flight}
              onChange={(e) =>
                setCurrentCrew({ ...currentCrew, flight: e.target.value })
              }
            >
              {mockFlights.map((flight) => (
                <MenuItem key={flight.id} value={flight.id}>
                  {flight.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

export default CrewList;
