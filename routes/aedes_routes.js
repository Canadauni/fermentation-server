const ferment_deliverfunc = (packet, cb) => {
  console.log(packet.payload.toString())
  return cb(packet)
}

module.exports = (aedes) => {
  aedes.on('client', (client) => {
    console.log('new_client', client.id)
  })

  aedes.on('clientError', (client, err) => {
    console.log('client error', client.id, err.message, err.stack)
  })

  aedes.on('connectionError', (client, err) => {
    console.log('client error')
    console.log(err.message)
    console.log(err.stack)
  })

  aedes.on('keepaliveTimeout', (client, err) => {
    console.log(client)
  })

  aedes.on('publish', (packet, client) => {
    if (client) {
      console.log('message from client', packet)
    }
  })

  aedes.on('subscribe', (subscriptions, client) => {
    if (client) {
      console.log('subscribe from client', subscriptions, client.id)
    }
  })

  aedes.subscribe('fermentation', ferment_deliverfunc, () => {
    return null
  } )


}