require('dotenv').config()
const express = require('express')
const Aedes = require('aedes')
const ws = require('websocket-stream')
const aedes_mqtt = new Aedes()
const app = express()
const helmet = require('helmet')
const http = require('http')
const mqserver = require('net').createServer(aedes_mqtt.handle)
const wsserver = http.createServer()

const port = 8000
const mqport = 8883
const wsport = 8080

// Set up express server first
app.use(helmet())
app.use(express.json())
app.use((req,res,next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
app.set('view engine','pug')

app.locals.recording = true

// Now set up MQTT broker
const aedes_routes = require('./routes/aedes_routes')
aedes_routes(aedes_mqtt)

mqserver.listen(mqport, () => {
  console.log(`aedes is listening ${mqport}`)
})

ws.createServer({server: wsserver}, aedes_mqtt.handle)
wsserver.listen(wsport, () => {
  console.log(`aedes websockets is listening on port ${wsport}`)
})

// Finally set up the express server to handle everything else
express_routes = require('./routes/express_routes')
express_routes(app)
app.listen(port, () => console.log(`Example app listing on ${port}`))