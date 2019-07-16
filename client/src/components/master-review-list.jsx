import React from "react";
import Review from "./review.jsx";
import Button from "react-bootstrap/Button";


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
    )
  }

  if (props.readAllClicked === true) {
    const elements = props.currentReviews.slice(0, 100);
    const items = [];

    for (const [index, value] of elements.entries()) {
      items.push(<Review key={index} currentReviews={elements[index]} />);
    }

    return (
      <div>
        hi
        {items}
      </div>
    )
  }

  if (props.moreClicked === true) {
    
    const elements = props.currentReviews.slice(0, 10);
    const items = [];
    
    for (const [index, value] of elements.entries()) {
      items.push(<Review key={index} currentReviews={elements[index]} />);
    }
    
    return (
      <div>
        hi
        {items}
        {/* <Button variant="dark" size="lg" className='readAllReviews' onClick={props.handleReadAllClick}>Read All Reviews ({props.currentReviews.length-11})</Button> */}
      </div>
    )
  }
  
}

export default MasterReviewList;