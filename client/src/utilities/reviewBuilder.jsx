import React from "react";
import dateConverter from "./dateConverter.jsx"

const reviewBuilder = (data) => {
  return (
    <div>
      <span>{data.reviewerName} {dateConverter(data.reviewDate)}</span>
      <br />
      <span>Rating: {data.reviewRating}</span>
      <br />
      <span>{data.reviewText}</span>
    </div>
  );
}

export default reviewBuilder;