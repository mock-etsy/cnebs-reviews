import React      from "react";
import Rating     from 'react-rating';
import Container  from 'react-bootstrap/Container'

const Average = (props) => {
  return (
    <Container>
      <Rating
            className='stars'
            readonly
            fullSymbol='fa fa-star fa-1.5x'
            emptySymbol='fa fa-star-o fa-1.5x'
            initialRating={props.averageRating}
          />
    </Container>
  )
}

export default Average;