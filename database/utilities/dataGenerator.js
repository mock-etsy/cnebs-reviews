const faker = require('faker');
const uuid = require('uuid/v4')

// Helper using faker and uuid to generate 100 fake reviews
const dataGen = () => {
  const arr = new Array(100).fill(0);
  for (let review = 0; review < arr.length; review++) {
    arr[review] = {
      reviewId: uuid(),
      name:     faker.name.findName(),
      date:     faker.date.past(1),
      rating:   faker.random.number(5),
      review:   faker.lorem.paragraph(4)
    }
  }
  return arr;
}

module.exports = { dataGen }