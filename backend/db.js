const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'airlines',
  password: 'password',
  port: 5432,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  },
};