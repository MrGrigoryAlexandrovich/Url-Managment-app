//  loading dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//     initializing express
const app = express();
//      loading middleware
app.use(cors());
app.use(bodyParser.json());
//      Loading routes
const routes = require('./routes/routes')
//      Initializing routes
app.use('/api/routes',routes)

const PORT = 8000 || process.env.PORT;

app.listen(PORT,()=>{
    console.log('Server run on ',PORT);
})