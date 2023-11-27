import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField
} from '@material-ui/core';

const mockAircrafts = [
  { id: 'AC001', model: 'Boeing 737', status: 'Active' },
  // ... more mock aircrafts
];

const AircraftList = () => {
  const [aircrafts, setAircrafts] = useState(mockAircrafts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAircraft, setCurrentAircraft] = useState({ id: '', model: '', status: '' });

  const openDialog = () => {
    setCurrentAircraft({ id: '', model: '', status: '' });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    setAircrafts([...aircrafts, { ...currentAircraft, id: `AC${aircrafts.length + 1}` }]);
    closeDialog();
  };

  const handleDelete = (id) => {
    setAircrafts(aircrafts.filter(aircraft => aircraft.id !== id));
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
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {aircrafts.map((aircraft) => (
              <TableRow key={aircraft.id}>
                <TableCell>{aircraft.id}</TableCell>
                <TableCell>{aircraft.model}</TableCell>
                <TableCell>{aircraft.status}</TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleDelete(aircraft.id)}>Delete</Button>
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
            onChange={(e) => setCurrentAircraft({ ...currentAircraft, model: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            value={currentAircraft.status}
            onChange={(e) => setCurrentAircraft({ ...currentAircraft, status: e.target.value })}
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
