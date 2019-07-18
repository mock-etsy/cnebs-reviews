import React     from "react";
import Container from 'react-bootstrap/Container'
import Row       from 'react-bootstrap/Row';
import faker     from 'faker';

const MeetTheOwner = (props) => {

  return (

    <Container>
      <Row>
        <span className="reviewsMeetTheOwnerOfText">Meet the owner of </span> 
        <span className="reviewsMeetTheOwnerOfUsername">{props.currentSellerUsername}</span>
      </Row>
      <Row>
        <img className="reviewsMeetTheOwnerOfAvatar" src={faker.image.avatar()} alt="Seller Profile Picture"/>
      </Row>
      <Row>
        <span className="reviewsMeetTheOwnerOfName">{props.currentSeller}</span>
      </Row>
    </Container>

  )

}

export default MeetTheOwner;