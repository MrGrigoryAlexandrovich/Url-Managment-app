//loading dependencies and config
const express = require("express");
const cors = require("cors");
const config = require("../config");
const Queries = require("./queries/queries");
const queries = new Queries();
// Loading routes and express
const app = express();
const routes = require("./routes/routes");
// define port
const PORT = config.PORT || 8000;
//loading middleware
app.use(cors());
app.use(express.json());
//Initializing routes
app.use("/api/routes", routes);

app.get('/chk', async (req, res) => {
      let find = await queries.checkIfExist(req.body.shortURL)
      if (find) {
      return res.redirect(find.realURL)
  } else
      return res.sendStatus(404)
})

//start server
app.listen(PORT, () => {
  console.log("Server run on ", PORT);
});
