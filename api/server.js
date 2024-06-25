const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();
const connectDB = require('./config/connectDB');
const transactionRoute = require('./routes/transaction.route');

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(bodyParser.json());

//transaction API
app.use('/api', transactionRoute);
app.use('/api', (req, res) => {
  res.send('search one');
});

const port = process.env.PORT || 8000;

const start = () => {
  try {
    app.listen(port, async () => {
      await connectDB(process.env.MONGODB_URI);
      console.log(`server is running at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
