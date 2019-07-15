import React         from "react";
import Rating        from "react-rating";
import dateConverter from "./dateConverter.jsx"

const reviewBuilder = (data) => {
  return (
    <div>
      <span className='reviewName'>
        {data.name} 
      </span>
      <span className='reviewDate'>
        {`  ${dateConverter(data.date)}`}
      </span>
      <p className='reviewRating'>
        <Rating
              className='stars'
              readonly
              fullSymbol='fa fa-star fa-1x'
              emptySymbol='fa fa-star-o fa-1x'
              initialRating={data.rating}
        />
      </p>
      <p className='reviewText'>
        {data.review}
      </p>
    </div>
  );
}

export default reviewBuilder;