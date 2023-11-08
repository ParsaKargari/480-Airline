const express = require('express');
const db = require('./db');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const port = 8000; // Backend server will run on port 8000

// Use the CORS middleware to allow requests from http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/flights', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM flights');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
