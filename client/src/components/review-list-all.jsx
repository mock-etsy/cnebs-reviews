import React from "react";
import Review from "./review.jsx"
import { checkPropTypes } from "prop-types";

const ReviewListAll = (props) => {

  const elements = props.currentReviews.slice(5);

  const items = []

  for (const [index, value] of elements.entries()) {
    items.push(<Review key={index} currentReviews={elements[index]} />)
  }

  return (
    <div>
      {items}
    </div>
  )

  // return (
  //   <div>
  //     {props.moreClicked === true ? <Review currentReviews={props.currentReviews[5]}/> : <span />}
  //     {props.moreClicked === true ? <Review currentReviews={props.currentReviews[6]}/> : <span />}
  //     {props.moreClicked === true ? <Review currentReviews={props.currentReviews[7]}/> : <span />}
  //     {props.moreClicked === true ? <Review currentReviews={props.currentReviews[8]}/> : <span />}
  //     {props.moreClicked === true ? <Review currentReviews={props.currentReviews[9]}/> : <span />}
  //     {props.moreClicked === true ? <Review currentReviews={props.currentReviews[10]}/> : <span />}
  //   </div>
  // )

}

export default ReviewListAll;