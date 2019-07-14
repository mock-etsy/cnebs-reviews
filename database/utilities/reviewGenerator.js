const weightedRandom = require('./weightedRandomNumber');
const uuid           = require('uuid/v4');
const faker          = require('faker');

// Helper used to generate a set of 100 fake reviews with average rating
const reviewGen = () => {

  let total = 0
  
  const reviewArr = new Array(100).fill(0);
  
  for (let review = 0; review < reviewArr.length; review++) { 

    reviewArr[review] = {
      reviewId: uuid(),
      name:     faker.name.findName(),
      date:     faker.date.past(1),
      rating:   Number(weightedRandom.weightedRandom( { 5:0.5, 4:0.2, 3:0.1, 2:0.1, 1:0.1} )),
      review:   faker.lorem.paragraph(4)
    }
  };
  
  for (let review = 0; review < reviewArr.length; review++) {
    total += reviewArr[review].rating;
  };
  
  let average = Math.floor(total/100);
  
  const reviewObj = {
    averageRating: average,
    reviews:       reviewArr
  };

  return reviewObj;
}

module.exports = { reviewGen };