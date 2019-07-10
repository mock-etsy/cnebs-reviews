import React from "react";
import Review from "./review.jsx"

const ReviewList = (props) => {

  return (
    <div>
      <h3>This is a list of Reviews</h3>
      <Review 
        currentReviews={props.currentReviews}
      />
    </div>
  )

}

export default ReviewList;