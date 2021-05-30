//loading dependencies and config
<<<<<<< HEAD
<<<<<<< HEAD
const express = require("express");
const cors = require("cors");
const config = require("../config");
const Queries = require("./queries/queries");
const queries = new Queries();
=======
=======
>>>>>>> parent of 1be00d9 (sorting code)
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('../config')
<<<<<<< HEAD
>>>>>>> parent of 1be00d9 (sorting code)
=======
>>>>>>> parent of 1be00d9 (sorting code)
// Loading routes and express
const app = express()
const routes = require('./routes/routes')
// define port
const PORT = config.PORT || 8000
//loading middleware
app.use(cors())
app.use(bodyParser.json())
//Initializing routes
<<<<<<< HEAD
<<<<<<< HEAD
app.use("/api/routes", routes);

app.get('/chk', async (req, res) => {
      let find = await queries.checkIfExist(req.body.shortURL)
      if (find) {
      return res.redirect(find.realURL)
  } else
      return res.sendStatus(404)
})

=======
app.use('/api/routes',routes)
>>>>>>> parent of 1be00d9 (sorting code)
=======
app.use('/api/routes',routes)
>>>>>>> parent of 1be00d9 (sorting code)
//start server
app.listen(PORT,()=>{
    console.log('Server run on ',PORT)
})