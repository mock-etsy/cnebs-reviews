const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index');
const data = require('../database/data');
const fakeData = require('../database/utilities/dataGenerator')

const { PORT, HOST } = require('../config.js')

const app = express();

const port = PORT || 3002;
const host = HOST || '0.0.0.0';

app.use('/', express.static('./client/dist'));

// Seed the database with fake data
db.seedDB(data);

// Test data generator
app.get('/reviews/test', (req, res) => {
  res.send(fakeData.dataGen());
})

// Display some fake data to the page
app.get('/reviews/sellers/seller', (req, res) => {
  db.retrieveSeller( (err, results) => {
    if (err) console.log(err);
    res.send(results);
  })
})


app.listen(port, host, () => 
  { console.log(`Eavesdropping on ${host} at ${port}`)});