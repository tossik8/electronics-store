const { Pool } = require("pg");

const connectionString = `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}?ssl=true`

const pool = new Pool({
    connectionString
});

module.exports = {
    query: (text, params) => pool.query(text, params)
}
