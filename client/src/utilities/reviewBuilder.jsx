import React from "react";
import dateConverter from "./dateConverter.jsx"

const reviewBuilder = (data) => {

  console.log('test all data: \n', data.name);

  return (
    <div>
      <span classname='reviewDate'>
        {data.name} {dateConverter(data.date)}
      </span>
      <br />
      <span classname='reviewRating'>
        Rating: {data.rating}
      </span>
      <br />
      <br />
      <span classname='reviewText'>
        {data.review}
      </span>
    </div>
  );
}

export default reviewBuilder;