const faker = require('faker');
const uuid = require('uuid/v4');
const reviewGen = require('./reviewGenerator');

// Helper to generate a set of sellers with respective review datasets
const dataGen = () => {
  const sellerArr = new Array(100).fill(0);
  for (let seller = 0; seller < sellerArr.length; seller++) {
    sellerArr[seller] = {
      sellerName:    faker.name.findName(),
      sellerId:      uuid(),
      reviewInfo:    reviewGen.reviewGen()
    }
  }
  // console.log('Seller count:', count)
  return sellerArr;
}

module.exports = { dataGen }