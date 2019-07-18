import React      from "react";
import faker      from 'faker';
import Image      from 'react-bootstrap/Image'

const ReviewerPhoto = (props) => {
  return (
    <Image src={`${faker.image.image()}`} thumbnail /> 
  )
}

export default ReviewerPhoto;