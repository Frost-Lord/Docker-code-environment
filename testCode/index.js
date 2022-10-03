const express = require('express')
const app = express()
require('dotenv').config();
const port = process.env.PORTOPEN;
console.log(process.env.portopen)
console.log(process.env)

app.get('/', (req, res) => {
  res.send('Hello World! lol this is dockerised')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})