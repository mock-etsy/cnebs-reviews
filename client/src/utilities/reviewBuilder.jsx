import React from "react";
import dateConverter from "./dateConverter.jsx"

const reviewBuilder = (data) => {

  console.log('test all data: \n', data[0].name);

  return (
    <div>
      <span>{data[0].name} {dateConverter(data[0].date)}</span>
      <br />
      <span>Rating: {data[0].rating}</span>
      <br />
      <span>{data[0].review}</span>
    </div>
  );
}

export default reviewBuilder;