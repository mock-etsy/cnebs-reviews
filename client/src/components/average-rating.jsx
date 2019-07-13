import React from "react";
import Rating     from 'react-rating';

const Average = (props) => {

  return (

    <div>
      <span>Average Seller Rating: {props.averageRating}</span>

      <Rating 
      readonly
      />

      <span> ({props.totalReviews})</span>
    </div>

  )
}

export default Average;