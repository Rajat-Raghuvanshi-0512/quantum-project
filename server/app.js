const express = require('express');
const app = express();
const cors = require('cors');

//Config path
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}
const cookieParser = require('cookie-parser');
const ErrorHandler = require('./src/middlewares/error');
const routes = require('./src/routes');

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000' }));

//Routes
app.use('/api', routes);

app.use(ErrorHandler);

module.exports = app;
