const pg = require('pg');

if (process.env.DATABASE_URL) {
  config = {
    // We use the DATABASE_URL from Heroku to connect to our DB
    connectionString: process.env.DATABASE_URL,
    // Heroku also requires this special `ssl` config
    ssl: { rejectUnauthorized: false },
  };
} else {
  // If we're not on heroku, configure PG to use our local database
  config = {
    host: 'localhost',
    port: 5432,
    database: 'weekend-to-do-app', 
  };
}


// const config = {
//   database: process.env.DATABASE_NAME || 'weekend-to-do-app',
//   host: 'localhost',
//   port: 5432,
// };

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('connected to postgres');
});

pool.on('error', (err) => {
  console.log('Error connecting to postgres', err);
});

module.exports = pool;
