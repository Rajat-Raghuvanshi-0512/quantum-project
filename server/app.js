const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require('./src/routes');
const ErrorHandler = require('./src/middlewares/error');
const path = require('path');

//Config path
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

//Routes
app.use('/api', routes);

//For production
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

app.use(ErrorHandler);

module.exports = app;
