import React from "react";
import reviewBuilder from "../utilities/reviewBuilder.jsx"

const Review = (props) => {

  return (
    <div>
      {reviewBuilder(props.currentReviews[0])}
    </div>
  )

}

export default Review;