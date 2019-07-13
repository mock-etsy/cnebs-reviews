import React from "react";
import dateConverter from "./dateConverter.jsx"

const reviewBuilder = (data) => {
  return (
    <div>
      <span>{data.name} {dateConverter(data.date)}</span>
      <br />
      <span>Rating: {data.rating}</span>
      <br />
      <span>{data.review}</span>
    </div>
  );
}

export default reviewBuilder;