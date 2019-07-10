
// helper to generate a weighted random number from a range of values.
// ex -> weightedRandom( { 1:0.5, 2:0.3, 3:0.2 } ) ... 50% chance of returning 1, 30% of 2, 20% of 3
weightedRandom = (spec) => {
  let i,
  sum=0, 
  r = Math.random();
  for (i in spec) {
    sum += spec[i];
    if (r <= sum) return i;
  }
}

module.exports = { weightedRandom };