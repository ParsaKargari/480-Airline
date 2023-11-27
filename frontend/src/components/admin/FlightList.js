import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

const mockFlights = [
  { id: 'FL001', label: 'Flight A', origin: 'City X', destination: 'City Y', date: '2023-12-01' },
  // ... more mock flights
];

const FlightList = () => {
  const [flights, setFlights] = useState(mockFlights );
  const [filterDate, setFilterDate] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentFlight, setCurrentFlight] = useState(null);

  const handleFilterChange = (event) => {
    setFilterDate(event.target.value);
  };

  const openDialog = (flight) => {
    setCurrentFlight(flight);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setCurrentFlight(null);
  };

  const handleSave = () => {
    if (currentFlight) {
      if (currentFlight.id) {
        // Edit mode
        setFlights(flights.map(flight => flight.id === currentFlight.id ? currentFlight : flight));
      } else {
        // Add mode
        setFlights([...flights, { ...currentFlight, id: `FL${flights.length + 1}` }]);
      }
    }
    closeDialog();
  };

  const handleDelete = (id) => {
    setFlights(flights.filter(flight => flight.id !== id));
  };

  const filteredFlights = filterDate ? flights.filter(flight => flight.date === filterDate) : flights;

  return (
    <>
      <TextField
        label="Filter by Date"
        type="date"
        value={filterDate}
        onChange={handleFilterChange}
        InputLabelProps={{
          shrink: true,
        }}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={() => openDialog({})}>
        Add New Flight
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Label</TableCell>
              <TableCell>Origin</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFlights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.id}</TableCell>
                <TableCell>{flight.label}</TableCell>
                <TableCell>{flight.origin}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{flight.date}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => openDialog(flight)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(flight.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>{currentFlight?.id ? 'Edit Flight' : 'Add Flight'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Label"
            type="text"
            fullWidth
            value={currentFlight?.label || ''}
            onChange={(e) => setCurrentFlight({ ...currentFlight, label: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Origin"
            type="text"
            fullWidth
            value={currentFlight?.origin || ''}
            onChange={(e) => setCurrentFlight({ ...currentFlight, origin: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Destination"
            type="text"
            fullWidth
            value={currentFlight?.destination || ''}
            onChange={(e) => setCurrentFlight({ ...currentFlight, destination: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={currentFlight?.date || ''}
            onChange={(e) => setCurrentFlight({ ...currentFlight, date: e.target.value })}
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
    </>
  );
};

export default FlightList;
