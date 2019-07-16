import React from "react";
import Review from "./review.jsx"
import { checkPropTypes } from "prop-types";

const ReviewListAll = (props) => {

  const elements = props.currentReviews.slice(5);
  const items = [];

  for (const [index, value] of elements.entries()) {
    items.push(<Review key={index} currentReviews={elements[index]} />);
  }

  return (
    <div>
      {items}
    </div>
  )
}

export default ReviewListAll;