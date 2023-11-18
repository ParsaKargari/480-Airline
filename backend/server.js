// const { spawn } = require('child_process');

const express = require('express');
const db = require('./db');
const cors = require('cors'); 

const app = express();
const port = 8000; // Backend server will run on port 8000

// Use the CORS middleware to allow requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());



//test get
app.get('/api/greet', (req, res) => {
  const name = req.query.name || 'Guest';

  // Spawn a Java process
  const javaProcess = spawn('java', ['/Users/geos/Desktop/ensf/480-Airline/backend/CoreService.java', name]);

  // Capture the output from the Java process
  let result = '';
  javaProcess.stdout.on('data', data => {
      result += data.toString();
  });

  // Handle the end of the Java process
  javaProcess.on('close', code => {
      if (code === 0) {
          res.send(result);
      } else {
          res.status(500).send('Internal Server Error');
      }
  });
});


app.get('/flights', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM flights');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});


app.get('/passenger', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM passengers');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});




app.use(express.json());

// Endpoint to handle POST requests to insert data into the flights table
app.post('/flights', (req, res) => {
  const { id, label, destination, origin, flightNumber, duration } = req.body;

  const query = 'INSERT INTO flights (id, label, destination, origin, flightNumber, duration) VALUES (?, ?, ?, ?, ?, ?)';

  connection.query(query, [id, label, destination, origin, flightNumber, duration], (error, results) => {
    if (error) {
      console.error('Error inserting data into flights:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json({ message: 'Flight data inserted successfully' });
  });
});

// Endpoint to handle POST requests to insert data into the passengers table
app.post('/passengers', (req, res) => {
  const { name, seat, seatType } = req.body;

  const query = 'INSERT INTO passengers (name, seat, seatType) VALUES (?, ?, ?)';

  connection.query(query, [name, seat, seatType], (error, results) => {
    if (error) {
      console.error('Error inserting data into passengers:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    res.json({ message: 'Passenger data inserted successfully' });
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});