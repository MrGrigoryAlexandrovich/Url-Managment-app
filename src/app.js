const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const routes = require('../src/routes/routes')
app.use('/api/routes',routes)

const PORT = 8000 || process.env.PORT;

app.listen(PORT,()=>{
    console.log('Server run on ',PORT);
})