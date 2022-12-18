// Importing the pg library (this is what helps us connect to our database!)
const pg = require('pg'); 

const Pool = pg.Pool;

const pool = new Pool({
  database: 'taskList', // the name of database, This can change!
  host: 'localhost', // where is your database?
  port: 5432, // the port for your database, 5432 is default for postgres
  max: 10, // how many connections (queries) at one time
  idleTimeoutMillis: 30000 // 30 second to try to connect, otherwise cancel query
});

// .on here looks familiar...this is how node can handle arbitrary events
// this is NOT required but it is very useful for debugging
pool.on('connect', () => {
  console.log('Postgresql connected');
});

// the pool with emit an error on behalf of any idle clients
// it contains if a back end error or network partition happens
pool.on('error', (error) => {
  console.log('Error with postgres pool', error)
});

module.exports = pool;