require('dotenv').config()
const express = require('express')
const Aedes = require('aedes')
const aedes = new Aedes()
const app = express()
const helmet = require('helmet')
const mqserver = require('net').createServer(aedes.handle)
const PGclient = require('pg').Client
const client = new PGclient({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
const port = 3000
const mqport = 8883
const wsport = 8888

client.connect();

app.use(helmet())

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listing on ${port}`))

aedes.on('client', (client) => console.log('new_client', client.id))

aedes.on('clientError', (client, err) => {
  console.log('client error', client.id, err.message, err.stack)
})

aedes.on('connectionError', (client, err) => {
  console.log('client error')
  console.log(err.message)
  console.log(err.stack)
})

aedes.on('publish', (packet, client) => {
  if (client) {
    console.log('message from client', client.id)
  }
})

aedes.on('subscribe', (subscriptions, client) => {
  if (client) {
    console.log('subscribe from client', subscriptions, client.id)
  }
})

mqserver.listen(mqport, () => console.log(`aedes is listening ${mqport}`))