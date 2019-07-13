import React from "react";
import StarRating from 'react-bootstrap-star-rating';

const Average = (props) => {

  return (

    <div>
      <span>Average Seller Rating: {props.averageRating}</span>

    <StarRating
        defaultValue={5}
        min={0}
        max={10}
        step={0.5} />

      <span> ({props.totalReviews})</span>
    </div>

  )
}

export default Average;