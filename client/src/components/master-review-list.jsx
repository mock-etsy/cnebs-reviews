import React from "react";
import Review from "./review.jsx";
import Button from "react-bootstrap/Button";


const ReviewList = (props) => {

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

  if (props.moreClicked === true) {
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

  if (props.readAllClicked === true) {
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

}

export default MasterReviewList;