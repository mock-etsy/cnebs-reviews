import React      from "react";
import faker      from 'faker';
import Image      from 'react-bootstrap/Image'

const ReviewerPhoto = (props) => {
  return (
    <Image src={`${faker.random.image()}`} thumbnail />
  )
}

export default ReviewerPhoto;