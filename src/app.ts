require('./database');
const express = require('express');
const morgan = require('morgan');
const app = new express();
const routes = require('./routes/employees.route');
const cors = require('cors');


app.set('port', 4000); // set the port
app.use(cors());
app.use(morgan('dev')); // set a middleware to read each request in console
app.use(express.json()); // set the middleware to read json request
app.use(express.urlencoded({ extended: true })); // set the middleware to read form data
app.use('/api/employees', routes); // add a route

module.exports = app;