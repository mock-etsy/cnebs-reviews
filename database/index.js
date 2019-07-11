const mysql      = require('mysql');
const config     = require('../config.js');

const connection = mysql.createConnection(config.DBCONFIG);

connection.connect();

// Confirm connection
const test = () => {
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
  });
}

// Seed database
const seedDB = ( data ) => {
  const reviews = data.data.data;
  reviews.forEach( review => {
    connection.query(`INSERT INTO reviews (reviewerID, reviewerName, reviewDate, reviewRating, reviewText) VALUES ("${review.id}", "${review.name}", "${review.date}", ${review.rating}, "${review.review}")`, 
    (error, results) => {
      if (error) {
        console.log('Error: ', error)
      } else {
        console.log(`DB seeded for ${review.name}`);
      }
    })
  })
}

const retrieveReview = (cb) => {
  connection.query(`
    SELECT 
      *
    FROM
      reviews
    ORDER BY RAND()
    LIMIT 5;
    `, 
    (error, results) => {
      if (error) {
        cb('Error retrieving 5 reviews: ', error)
      } else {
        cb(null, results);
      }
    });
}

module.exports = { test, seedDB, retrieveReview }