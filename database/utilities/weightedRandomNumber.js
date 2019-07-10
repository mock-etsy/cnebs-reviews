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