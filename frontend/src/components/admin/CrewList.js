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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import axios from "axios";

const CrewList = () => {
  const [crews, setCrews] = useState([]);

  const [selectedFlight, setSelectedFlight] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [flights, setFlights] = useState([]);
  const [currentCrew, setCurrentCrew] = useState({
    employeeID: "",
    name: "",
    employment: "",
    flightNo: "",
  });

  const fetchCrews = async () => {
    const response = await axios.get(`http://localhost:8080/api/crew`);
    console.log(response.data);
    setCrews(response.data);
  };

  const fetchFlights = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/flights`);
      setFlights(response.data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  useEffect(() => {
    fetchCrews();
    fetchFlights();
  }, []);

  const handleFlightChange = (event) => {
    setSelectedFlight(event.target.value);
  };

  const openDialog = (
    crew = { employeeID: "", name: "", employment: "", flightNo: "" }
  ) => {
    setCurrentCrew(crew);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = async () => {
    try {
      const crewData = {
        name: currentCrew.name,
        employeeID: parseInt(currentCrew.employeeID, 10),
        employment: currentCrew.employment,
        flightNo: currentCrew.flightNo,
      };

      if (currentCrew.id) {
        // Edit mode
        await axios.put(
          `http://localhost:8080/api/crew/${currentCrew.id}`,
          crewData
        );
      } else {
        // Add mode
        await axios.post(
          `http://localhost:8080/api/crew/${crewData.flightNo}`,
          crewData
        );
      }

      fetchCrews();
      closeDialog();
    } catch (error) {
      console.error("Error saving crew:", error);
    }
  };

  const handleDelete = async (crew) => {
    try {
      const payload = {
        name: crew.name,
        flightNo: crew.flightNo,
      };

      await axios.delete(`http://localhost:8080/api/crew`, { data: payload });

      fetchCrews();
    } catch (error) {
      console.error("Error deleting crew:", error);

    }
  };

  const getUniqueFlightNumbers = (crews) => {
    const uniqueFlights = new Set(crews.map((crew) => crew.flightNo));
    return Array.from(uniqueFlights);
  };

  const filteredCrews = selectedFlight
    ? crews.filter((crew) => crew.flightNo === selectedFlight)
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
          {getUniqueFlightNumbers(crews)?.map((flightNo) => (
            <MenuItem key={flightNo} value={flightNo}>
              {flightNo}
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
              <TableCell>Employment</TableCell>
              <TableCell>Flight</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCrews?.map((crew) => (
              <TableRow key={crew.id}>
                <TableCell>{crew.id}</TableCell>
                <TableCell>{crew.name}</TableCell>
                <TableCell>{crew.employment}</TableCell>
                <TableCell>{crew.flightNo}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => openDialog(crew)}>
                    Edit
                  </Button>
                  <Button color="secondary" onClick={() => handleDelete(crew)}>
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
            label="Employee ID"
            type="number"
            fullWidth
            value={currentCrew.employeeID}
            onChange={(e) =>
              setCurrentCrew({ ...currentCrew, employeeID: e.target.value })
            }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="select-crew-employment-label">
              Employment
            </InputLabel>
            <Select
              labelId="select-crew-employment-label"
              value={currentCrew.employment}
              onChange={(e) =>
                setCurrentCrew({ ...currentCrew, employment: e.target.value })
              }
            >
              <MenuItem value="PILOT">PILOT</MenuItem>
              <MenuItem value="CREW">CREW</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="select-crew-flight-label">Flight Number</InputLabel>
            <Select
              labelId="select-crew-flight-label"
              value={currentCrew.flightNo}
              onChange={(e) =>
                setCurrentCrew({ ...currentCrew, flightNo: e.target.value })
              }
            >
              {flights.map((flight) => (
                <MenuItem key={flight.id} value={flight.flightNo}>
                  {flight.flightNo}
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
