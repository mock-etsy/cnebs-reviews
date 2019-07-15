import React      from "react";
import Rating     from 'react-rating';
import Container  from 'react-bootstrap/Container'

const Average = (props) => {
  return (
    <span>
      <Rating
            className='averageStars'
            readonly
            fullSymbol='fa fa-star fa-1x'
            emptySymbol='fa fa-star-o fa-1x'
            initialRating={props.averageRating}
          /> 
      <span className='totalReviews'> ({props.totalReviews})</span>
    </span>
  )
}

export default Average;