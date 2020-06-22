require('dotenv').config()
const express = require('express');
const fileupload = require('express-fileupload');
const route = require('./router')

const app = express();
const PORT = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(fileupload());
app.use(route)

app.listen(PORT, async () => {
  console.log(`server listening in http://localhost:${PORT}`)
})