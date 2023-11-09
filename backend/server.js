const express = require('express');
const db = require('./db');
const cors = require('cors'); 

const app = express();
const port = 8000; // Backend server will run on port 8000

// Use the CORS middleware to allow requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

app.get('/flights', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM flights');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.post('/flights', async (req, res) => {
  try {
    const { flight_number, name } = req.body; 
    const query = 'INSERT INTO flights (flight_number, airline_name) VALUES ($1, $2) RETURNING *';
    const values = [flight_number, name];

    const { rows } = await db.query(query, values);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
