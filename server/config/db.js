const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOSTNAME,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  ssl: true,
  min: 0,
  max: 10,
  createTimeoutMillis: 8000,
  acquireTimeoutMillis: 8000,
  idleTimeoutMillis: 8000,
  reapIntervalMillis: 1000,
  createRetryIntervalMillis: 100,
});

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL:", error);
  });

pool.on("connect", (_client) => {
  // On each new client initiated, need to register for error(this is a serious bug on pg, the client throw errors although it should not)
  _client.on("error", (err) => {
    console.log(err);
  });
});

pool.on("error", (err) => {
  console.log(err);
});

module.exports = pool;
