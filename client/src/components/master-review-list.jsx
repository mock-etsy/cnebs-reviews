import React from "react";
import Review from "./review.jsx";

const MasterReviewList = (props) => {

  if (props.moreClicked === false) {
    return (
      <div>
        <Review currentReviews={props.currentReviews[0]}/>
        {typeof props.currentReviews[1] !== 'undefined' ? <Review currentReviews={props.currentReviews[1]}/> : <div />}
        {typeof props.currentReviews[2] !== 'undefined' ? <Review currentReviews={props.currentReviews[2]}/> : <div />}
        {typeof props.currentReviews[3] !== 'undefined' ? <Review currentReviews={props.currentReviews[3]}/> : <div />}
        {typeof props.currentReviews[4] !== 'undefined' ? <Review currentReviews={props.currentReviews[4]}/> : <div />}
      </div>
    );
  }

  if (props.readAllClicked === true) {
    const elements = props.currentReviews.slice(0, 100);
    const items = [];

    for (const [index] of elements.entries()) {
      items.push(<Review key={index} currentReviews={elements[index]} />);
    }

    return (
      <div>
        {items}
      </div>
    );
  }

  if (props.moreClicked === true) {
    
    const elements = props.currentReviews.slice(0, 20);
    const items = [];
    
    for (const [index] of elements.entries()) {
      items.push(<Review key={index} currentReviews={elements[index]} />);
    }
    
    return (
      <div>
        {items}
      </div>
    );
  }
  
}

export default MasterReviewList;