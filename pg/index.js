const { Pool } = require('pg');

// works without connection information bc it uses env variables
const pool = new Pool({
  user: 'nickhonen',
  host: 'localhost',
  database: 'lineups',
  // password: 'secretpassword',
  port: 5432,
})

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err)
//   process.exit(-1)
// })

// test query
pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

// From "Express with async/await" part of guide.
module.exports = {
  query: (text, params) => pool.query(text, params),
}

