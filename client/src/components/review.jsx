import React         from "react";
import reviewBuilder from "../utilities/reviewBuilder.jsx"

const Review = (props) => {
  return (
    <div>
      <br />
        {reviewBuilder(props.currentReviews)}
      <br />
    </div>
  )
}

export default Review;