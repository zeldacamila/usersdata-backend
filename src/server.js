require('dotenv').config()
const express = require('express');
const { connect } = require('./db');
const adminRoute = require('./api/admin/admin.route')

const app = express()
const port = process.env.PORT
connect();

app.use(express.json())

app.use('/', adminRoute)

app.listen(port, () => {
  console.log(`Successfully running at port: ${port}`)
})