//loading dependencies and config
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('../config')

// Loading routes and express
const app = express()
const routes = require('./routes/routes')

// define port
const PORT = config.PORT || 8000

//loading middleware
app.use(cors())
app.use(bodyParser.json())

//Initializing routes
app.use('/api/routes',routes)

//start server
app.listen(PORT,()=>{
    console.log('Server run on ',PORT)
})