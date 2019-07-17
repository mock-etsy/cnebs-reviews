import React from 'react';

const randomFromArray = (inputArr) => {

  let result = inputArr[Math.floor(Math.random()*inputArr.length)];

  return result;

}

export default randomFromArray;