require('dotenv').config()
const express = require('express');
const fileupload = require('express-fileupload');
const cors = require('cors')
const route = require('./router')

const app = express();
const PORT = process.env.PORT || 4000

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(fileupload());
app.use(route)

app.listen(PORT, async () => {
  console.log(`server listening in http://localhost:${PORT}`)
})