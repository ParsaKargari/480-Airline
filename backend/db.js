const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: '',
  password: '',
  database: '',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});
