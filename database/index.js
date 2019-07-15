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
  const fullData = data.data.data;

  // Fill sellers table
  fullData.forEach( seller => {
    connection.query(`
      INSERT INTO
        sellers
          (
            sellerID, 
            sellerName,
            sellerUserName,
            sellerAvatar,
            averageRating
          )
        VALUES
          (
            "${seller.sellerId}",
            "${seller.sellerName}",
            "${seller.sellerUsername}",
            "${seller.sellerAvatar}",
            ${seller.reviewInfo.averageRating}
          )
    `, (error, results) => {
      if (error) {
        console.log('Seeding error: ', error);
      } else {
        console.log('\nSeeded info for seller: ', seller.sellerName);
      }
    });

    // fill reviews table
    seller.reviewInfo.reviews.forEach( review => {
      connection.query(`
      INSERT INTO
        reviews
          (
            reviewerID, 
            reviewerName, 
            reviewerAvatar,
            reviewDate,
            reviewRating,
            reviewText,
            sellers_ID
          )
        VALUES
          (
            "${review.reviewId}",
            "${review.name}",
            "${review.avatar}",
            "${review.date}",
            ${review.rating},
            "${review.review}",
            "${seller.sellerId}"
          )
    `, (error, results) => {
          if (error) {
            console.log('Seeding error: ', error);
          } else {
            console.log('\nSeeded rating for ',seller.sellerName,': ', review.rating);
          }
      })
    });
  })
}

const retrieveSeller = (id, cb) => {
  connection.query(`
    SELECT 
      sellers_ID,
      sellerName,
      sellerAvatar,
      averageRating,
      reviewerName,
      reviewerAvatar,
      reviewDate,
      reviewRating,
      reviewText
    FROM
      sellers,
      reviews
    WHERE
      reviews.sellers_ID = "${id}"
    AND 
      sellerID = "${id}";
    `, 
    (error, results) => {
      if (error) {
        cb('Error retrieving reviews for 1 seller: ', error)
      } else {
        cb(null, results);
      }
    });
}

const retrieveSellerIds = (cb) => {
  
  connection.query(`select sellerID from sellers;`,(error, results) => {
    if (error) {
      cb('Error retrieving seller IDs', error);
    } else {
      cb(null, results);
    }
  })
}

module.exports = { test, seedDB, retrieveSeller, retrieveSellerIds }