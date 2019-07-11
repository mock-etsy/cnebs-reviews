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

  // Fill reviews table
  fullData.forEach( seller => {
    connection.query(`
      INSERT INTO
        sellers
          (
            sellerID, 
            sellerName, 
            averageRating
          )
        VALUES
          (
            "${seller.sellerId}",
            "${seller.sellerName}",
            ${seller.reviewInfo.averageRating}
          )
    `, (error, results) => {
      if (error) {
        console.log('Seeding error: ', error);
      } else {
        console.log('\nSeeded.\n');
      }
    });
    seller.reviewInfo.reviews.forEach( review => {
      connection.query(`
      INSERT INTO
        reviews
          (
            reviewerID, 
            reviewerName, 
            reviewDate,
            reviewRating,
            reviewText,
          )
        VALUES
          (
            "${review.reviewId}",
            "${review.name}",
            "${review.date}",
            ${review.rating},
            "${review.review}",
          )
    `, (error, results) => {
          if (error) {
            console.log('Seeding error: ', error);
          } else {
            console.log('\nSeeded.\n');
          }
      })
    });
  })

  // // fill Sellers table
  // fullData.forEach( seller => {
  //   connection.query(`
  //     INSERT INTO
  //       sellers
  //         (
  //           sellerID, 
  //           sellerName, 
  //           averageRating
  //         )
  //       VALUES
  //         (
  //           "${seller.sellerId}",
  //           "${seller.sellerName}",
  //           ${seller.reviewInfo.averageRating}
  //         )
  //   `, (error, results) => {
  //     if (error) {
  //       console.log('Seeding error: ', error);
  //     } else {
  //       console.log('\nSeeded.\n');
  //     }
  //   })
  // });
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