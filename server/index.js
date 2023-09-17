const app = require('./app');
const connectToMongo = require('./src/utils/connectToDb');

//Config path
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config();
}

// Handling Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//Connecting to Database
connectToMongo();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT} 🔥`)
);

// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
