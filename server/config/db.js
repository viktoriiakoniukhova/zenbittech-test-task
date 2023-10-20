const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOSTNAME,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  ssl: true,
});

pool.on("error", (err) => {
  console.log(err);
});

module.exports = pool;
