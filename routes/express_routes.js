module.exports = (app) => {
  app.get('/', (req,res) => {
    res.send('Hello World!')
  })
  app.get('/recording', (req,res) => {
    res.json({"recording":app.locals.recording})
  })
  app.post('/recording', (req,res) => {
    console.log(req.body)
    res.status(666).send('fini')
    // app.locals.recording = req.body.json
  })
}