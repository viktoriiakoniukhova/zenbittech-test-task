const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.PG_NICKNAME,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOSTNAME,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
});

module.exports = pool;
