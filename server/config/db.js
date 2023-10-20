const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOSTNAME,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  ssl: true,
});

pool
  .connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL:", error);
  });

pool.on("error", (err) => {
  console.log(err);
});

module.exports = pool;
