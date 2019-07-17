import React from "react";
import Review from "./review.jsx";

const MasterReviewList = (props) => {

  // Most collapsed view: Show 5 reviews
  if (props.moreClicked === false) {
    return (
      <div className="collapsed-review-list-container">
        <Review currentReviews={props.currentReviews[0]}/>
        {typeof props.currentReviews[1] !== 'undefined' ? <Review currentReviews={props.currentReviews[1]}/> : <div />}
        {typeof props.currentReviews[2] !== 'undefined' ? <Review currentReviews={props.currentReviews[2]}/> : <div />}
        {typeof props.currentReviews[3] !== 'undefined' ? <Review currentReviews={props.currentReviews[3]}/> : <div />}
      </div>
    );
  }

  // [Read All Reviews] is clicked: Show all reviews
  if (props.readAllClicked === true) {
    const elements = props.currentReviews.slice(0, 100);
    const items = [];

    for (const [index] of elements.entries()) {
      items.push(<Review key={index} currentReviews={elements[index]} />);
    }

    return (
      <div className="all-reviews-list-container">
        {items}
      </div>
    );
  }

  // [+ More] is clicked: Show 20 reviews
  if (props.moreClicked === true) {
    const elements = props.currentReviews.slice(0, 20);
    const items = [];
    
    for (const [index] of elements.entries()) {
      items.push(<Review key={index} currentReviews={elements[index]} />);
    }
    
    return (
      <div className="more-review-list-container">
        {items}
      </div>
    );
  }
  
}

export default MasterReviewList;