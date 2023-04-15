import router from "./router";

const express = require('express');
const morgan = require('morgan');
const app = new express();
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.set('port', 4000); // set the port
app.use(cors());
app.use(morgan('dev')); // set a middleware to read each request in console
app.use(express.json()); // set the middleware to read json request
app.use(express.urlencoded({ extended: true })); // set the middleware to read form data
app.use(fileUpload()); // handle files
const server = router(app);
export default server;