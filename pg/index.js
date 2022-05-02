const { Pool, Client } = require('pg');

const credentials = {
	user: 'nickhonen',
	host: 'localhost',
	database: 'lineups',
	port: 5432,
};

// Connect with connection pool

async function poolDemo() {
	const pool = new Pool(credentials);
	const now = await pool.query('SELECT NOW()');
	await pool.end();

	return now;
}

// Connect with a client.

async function clientDemo() {
	const client = new Client(credentials);
	await client.connect();
	const now = await client.query('SELECT NOW()');
	await client.end();

	return now;
}

const pool = new Pool()

module.exports = {
	query: (text, params, callback) => {
		return pool.query(text, params, callback)
	}
}