const express = require('express');
const app = express();
const port = 3000;


app.get('/api/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error executing query: ' + err);
        res.status(500).send('Error fetching data from the database');
      } else {
        res.json(results);
      }
    });
  });
  

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
