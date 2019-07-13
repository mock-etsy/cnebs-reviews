// Middleware
import React      from "react";
import axios      from 'axios';
import Container  from 'react-bootstrap/Container';
import Row        from 'react-bootstrap/Row';
import Col        from 'react-bootstrap/Col';
import Average    from "./components/average-rating.jsx"
import ReviewList from "./components/review-list.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSeller        : 'Charles Neblett',
      currentAverageRating : 5,
      currentReviews       : [ 
                                {
                                  name   : "Elijah Keebler",
                                  date   : "2019-04-03T18:07:56.183Z",
                                  rating : 4,
                                  review : "Nihil iste doloribus rerum assumenda voluptatem au… aut repellat et esse sed non corporis provident."
                                }
                             ],
      sellerIds            : [],
    };

    // binds:
    this.retrieveSeller = this.retrieveSeller.bind(this);
  }

  // Retrieve a seller:
  retrieveSeller(id) {
    axios
      .get(`/reviews/sellers/${id}`)
      .then( res => {
        const data = res.data;
        
        // define variables to modify state:
        const currentSeller = data[0].sellerName;
        const average       = data[0].averageRating;
        const reviews       = [];

        // fill ^reviews array with appropriate data:
        data.forEach( review => reviews.push(
          {
            name   : review.reviewerName, 
            date   : review.reviewDate, 
            rating : review.reviewRating, 
            review : review.reviewText
          }
        ));

        // set the state with new data:
        this.setState({
          currentSeller        : currentSeller,
          currentAverageRating : average,
          currentReviews       : reviews
        })
      })
      .catch( err => console.log(`Error retrieving seller info for id ${id}:\n${err}`));
  }

  // Update state of current reviews on refresh
  componentDidMount() {
    axios
      .get('/reviews/sellers')
      .then( res => {
        const ids  = [];
        const data = res.data
        data.forEach( id => ids.push(id.sellerID))
        let randomId = ids[Math.floor(Math.random() * (101 - 1)) + 1]
        this.retrieveSeller(randomId);
      })
      .catch( err => console.log(`Error retrieving seller IDs from DB`));
  }

  render() {
    return (
    <Container>
      <Row>
        <h1>Reviews</h1>
      </Row>
      <Row>
        <Average 
          averageRating={this.state.currentAverageRating}
          totalReviews={this.state.currentReviews.length}
        />
      </Row>
      <Row>
        <ReviewList 
          currentReviews={this.state.currentReviews}
        />
      </Row>
    </Container>
    );
  }
}

export default App;