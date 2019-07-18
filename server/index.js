const express    = require('express');
const bodyParser = require('body-parser');
const path       = require('path');
const cors       = require('cors');
const db         = require('../database/index');
const data       = require('../database/data');
const listData   = require('../database/forCharles');
const fakeData   = require('../database/utilities/dataGenerator')

const { PORT, HOST } = require('../config.js')

const app = express();

const port = PORT || 3002;
const host = HOST || '0.0.0.0';

app.use(cors());
app.use('/', express.static('./client/dist'));

// database seeding functions:
// // db.seedDB(data);
// // db.seedDBListingID(listData.sellerData);
// // db.seedDBProductInfo(listData.itemIDandPhotoforCharles);

// // Test data generator on /test
// app.get('/reviews/test', (req, res) => {
//   res.send(fakeData.dataGen());
// })



// Get seller information for a single seller ID
app.get('/reviews/sellers/product/:id', (req, res) => {
  db.retrieveSeller( req.params.id, (err, results) => {
    if (err) console.log(err);
    res.send(results);
  });
})

// Get seller IDs from database
app.get('/reviews/sellers', (req, res) => {
  db.retrieveSellerIds( (err, results) => {
    if (err) console.log(err);
    res.send(results);
  });
})

app.listen(port, host, () => 
  { console.log(`Eavesdropping on ${host} at ${port}`)});