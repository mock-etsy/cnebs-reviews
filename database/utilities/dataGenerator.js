const faker     = require('faker');
const uuid      = require('uuid/v4');
const reviewGen = require('./reviewGenerator');

// Generate a set of 100 'sellers' with respective review datasets
const dataGen = () => {

  const sellerArr = new Array(100).fill(0);

  for (let seller = 0; seller < sellerArr.length; seller++) {

    sellerArr[seller] = {
      sellerName:     faker.name.findName(),
      sellerUsername: faker.internet.userName(),
      sellerId:       uuid(),
      sellerAvatar:   faker.image.avatar(),
      reviewInfo:     reviewGen.reviewGen()
    }

  }
  
  return sellerArr;
}

module.exports = { dataGen }