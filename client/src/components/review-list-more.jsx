import React  from "react";
import Review from "./review.jsx"
import Button from "react-bootstrap/Button";

const ReviewListMore = (props) => {

  return (
    <div>
      {props.moreClicked === true ? <Review currentReviews={props.currentReviews[5]}/> : <span />}
      {props.moreClicked === true ? <Review currentReviews={props.currentReviews[6]}/> : <span />}
      {props.moreClicked === true ? <Review currentReviews={props.currentReviews[7]}/> : <span />}
      {props.moreClicked === true ? <Review currentReviews={props.currentReviews[8]}/> : <span />}
      {props.moreClicked === true ? <Review currentReviews={props.currentReviews[9]}/> : <span />}
      {props.moreClicked === true ? <Review currentReviews={props.currentReviews[10]}/> : <span />}
      <Button variant="dark" size="lg" className='readAllReviews' onClick={props.handleReadAllClick}>Read All Reviews ({props.currentReviews.length-11})</Button>
    </div>
  )

}

export default ReviewListMore;