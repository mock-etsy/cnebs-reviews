import React from "react";
import Review from "./review.jsx"

const ReviewList = (props) => {

  return (
    <div>
      <Review currentReviews={props.currentReviews[0]}/>
      {typeof props.currentReviews[1] !== 'undefined' ? <Review currentReviews={props.currentReviews[1]}/> : <div />}
      {typeof props.currentReviews[2] !== 'undefined' ? <Review currentReviews={props.currentReviews[2]}/> : <div />}
      {typeof props.currentReviews[3] !== 'undefined' ? <Review currentReviews={props.currentReviews[3]}/> : <div />}
      <span className="fadedReview">
        {typeof props.currentReviews[4] !== 'undefined' ? <Review currentReviews={props.currentReviews[4]}/> : <div />}
      </span>
    </div>
  )

}

export default ReviewList;