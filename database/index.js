const mysql      = require('mysql');
const config     = require('../config.js');

const connection = mysql.createConnection({
  host       : process.env.RDS_HOSTNAME || config.DBCONFIG.host,
  user       : process.env.RDS_USERNAME || config.DBCONFIG.user,
  password   : process.env.RDS_PASSWORD || config.DBCONFIG.password,
  port       : process.env.RDS_PORT     || 3306,
  database   : process.env.RDS_DB_NAME  || config.DBCONFIG.database
});

const knex = require('knex') ({
  client: 'mysql',
  connection: {
    host       : process.env.RDS_HOSTNAME || config.DBCONFIG.host,
    user       : process.env.RDS_USERNAME || config.DBCONFIG.user,
    password   : process.env.RDS_PASSWORD || config.DBCONFIG.password,
    port       : process.env.RDS_PORT     || 3306,
    database   : process.env.RDS_DB_NAME  || config.DBCONFIG.database 
  }
})

connection.connect();

/*
// FOR DOCKER RE-SEEDING:
// connection.query(`DROP TABLE IF EXISTS reviews, sellers;`);

// connection.query(`
//   CREATE TABLE sellers (
//     sellerID VARCHAR(500) PRIMARY KEY,
//     sellerName VARCHAR(500),
//     sellerUsername VARCHAR(500),
//     sellerAvatar VARCHAR(500),
//     averageRating INT,
//     listingID INT,
//     productTitle VARCHAR(500),
//     productImage VARCHAR(500)
//   );
// `);

// connection.query(`
//   CREATE TABLE reviews (
//       reviewerID VARCHAR(500) PRIMARY KEY,
//       reviewerName VARCHAR(500),
//       reviewerAvatar VARCHAR(500),
//       reviewDate VARCHAR(500),
//       reviewRating INT,
//       reviewText TEXT,
//       sellers_ID VARCHAR(500),
//       FOREIGN KEY (sellers_ID)
//         REFERENCES sellers(sellerID)
//   );
// `);
^ FOR DOCKER RE-SEEDING^
*/

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

const seedDBListingID = function(data) {

  data.forEach(seller => {
    connection.query(
      `UPDATE sellers SET listingID = ${seller.item}
       WHERE sellerName = "${seller.sellerName}"`,
      function(error, results) {
        if (error) {
          console.log('Error in seeding listing id: \n', error);
        } else {
          console.log(`Seeded ${seller.sellerName} with ${seller.item}.`);
        }
      }
    );
  });
};

const seedDBProductInfo = function(data) {
  const products = data;
  products.forEach( product => {
    connection.query(
      `UPDATE sellers 
        SET 
          productTitle = "${product.title}",
          productImage = "${product.reviewItemPhoto}"
        WHERE 
        listingID = ${product.listing_id}`,
      function(error, results) {
        if (error) {
          console.log('Error in seeding listing id: ', error);
        } else {
          console.log('Review-Product info seeded for: \n', product.title);
        }
      }
    );
  });
};

const retrieveSellerDEPRECATED = (id, cb) => {
  connection.query(`
    SELECT 
      sellers_ID,
      sellerName,
      sellerUsername,
      sellerAvatar,
      listingID,
      productTitle,
      productImage,
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
      reviews.sellers_ID = (SELECT sellerID FROM sellers WHERE listingID = ${id})
    AND 
      sellerID = (SELECT sellerID FROM sellers WHERE listingID = ${id});
    `, 
    (error, results) => {
      if (error) {
        cb('Error retrieving reviews for 1 seller: ', error)
      } else {
        cb(null, results);
      }
    });
}

const retrieveSeller = id => {

  const subquery = knex.select('sellerID').from('sellers').where({ listingID : id })

  knex(knex.raw('sellers, reviews')).where({
    'reviews.sellers_ID' : subquery,
    'sellerID'           : subquery
  }).select(
    'sellers_ID',
    'sellerName',
    'sellerUsername',
    'sellerAvatar',
    'listingID',
    'productTitle',
    'productImage',
    'averageRating',
    'reviewerName',
    'reviewerAvatar',
    'reviewDate',
    'reviewRating',
    'reviewText'
  )

  // knex.select('sellerID', 'reviewerName').from(knex.raw('sellers, reviews'))

  // knex.select(
  //     'sellers_ID',
  //     'sellerName',
  //     'sellerUsername',
  //     'sellerAvatar',
  //     'listingID',
  //     'productTitle',
  //     'productImage',
  //     'averageRating',
  //     'reviewerName',
  //     'reviewerAvatar',
  //     'reviewDate',
  //     'reviewRating',
  //     'reviewText'
  //   ).from(
  //     knex.raw('sellers, reviews')
  //   )
  //   .where({
  //     'reviews.sellers_ID': subquery,
  //     'sellerID'          : subquery
  //   })

    .then( result => {
      console.log('knex query result: ', result);
    })
    .catch( error => {
      console.log('knex error: ', error)
    })
}

const retrieveSellerIds = (cb) => {
  
  connection.query(`select listingID from sellers;`,(error, results) => {
    if (error) {
      cb('Error retrieving listing IDs', error);
    } else {
      cb(null, results);
    }
  })
}

module.exports = { seedDB, retrieveSeller, retrieveSellerIds, seedDBListingID, seedDBProductInfo }