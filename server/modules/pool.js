const pg = require('pg');

const config = {
  database: 'weekend-to-do-app',
  host: 'localhost',
  port: 5432,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  // console.log('connected to postgres');
});

pool.on('error', (err) => {
  console.log('Error connecting to postgres', err);
});

module.exports = pool;
