require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const url = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../client/build')));

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.info('MongoDB successfully connected!');
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/cases', require('./api/cases'));
app.use('/api/patients', require('./api/patients'));
app.use('/api/psychologists', require('./api/psychologists'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use((req, res, next) => {
  res.status(404).send();
  next();
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send(error.message);
  next();
});

const server = app.listen(port);

module.exports = server;
