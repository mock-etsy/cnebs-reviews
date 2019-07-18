import React         from "react";
import Container     from 'react-bootstrap/Container'
import Row           from 'react-bootstrap/Row';
import Col           from 'react-bootstrap/Col';
import ReviewerPhoto from './reviewer-product-image.jsx';

const ReviewerPhotos = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="reviewerPhotosHeader">
            Photos from reviews
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <ReviewerPhoto />
        </Col>
        <Col>
          <ReviewerPhoto />
        </Col>
        <Col>
          <ReviewerPhoto />
        </Col>
        <Col>
          <ReviewerPhoto />
        </Col>
        <Col>
          <ReviewerPhoto />
        </Col>
      </Row>
    </Container>
  )
}

export default ReviewerPhotos;