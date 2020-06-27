require('dotenv').config()
const express = require('express');
const fileupload = require('express-fileupload');
const cors = require('cors')
const route = require('./router')

const app = express();
const PORT = process.env.PORT || 4000

const whitelist = ['http://localhost:3000', 'http://localhost:3001', 'https://front-transport.vercel.app']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

//middlewares
app.use(cors(corsOptionsDelegate))
app.use(express.json())
app.use(fileupload());
app.use(route)

app.listen(PORT, async () => {
  console.log(`server listening in port ${PORT}`)
})