const PGclient = require('pg').Client
const client = new PGclient({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

client.connect()