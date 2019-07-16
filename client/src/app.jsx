import React            from "react";
import axios            from 'axios';
import Container        from 'react-bootstrap/Container';
import Row              from 'react-bootstrap/Row';
import Col              from 'react-bootstrap/Col';
import Average          from "./components/average-rating.jsx";
import Button           from "react-bootstrap/Button";
import MasterReviewList from "./components/master-review-list.jsx"

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      moreClicked          : false,
      readAllClicked       : false,
      currentSellerID      : 'Initial State Seller ID Placeholder',
      currentSeller        : 'Initial State Seller Name Placeholder',
      currentAverageRating : 2.5,
      sellerIds            : [],
      currentReviews       : [ 
                                {
                                  name   : "Elijah Keebler",
                                  date   : "2019-04-03T18:07:56.183Z",
                                  rating : 4,
                                  review : "Nihil iste doloribus rerum assumenda voluptatem au… aut repellat et esse sed non corporis provident."
                                }
                             ]
    };

    // broadcast channel:
    this.reviewChannel = new BroadcastChannel('regretfully');
    
    // binds:
    this.retrieveSeller            = this.retrieveSeller.bind(this);
    this.handleMoreClick           = this.handleMoreClick.bind(this);
    this.handleReadAllReviewsClick = this.handleReadAllReviewsClick.bind(this);
  }

  handleMoreClick() {
    this.setState({moreClicked:true});
  }

  handleReadAllReviewsClick() {
    this.setState({readAllClicked:true});
    console.log(this.state.readAllClicked);
  }

  // Retrieve a seller:
  retrieveSeller(id) {
    axios
      .get(`/reviews/sellers/product/${id}`)
      .then( res => {
        const data = res.data;
        
        // define variables to modify state:
        const currentSellerID  = data[0].sellers_ID;
        const currentSeller    = data[0].sellerName;
        const currentProductID = data[0].listingID;
        const average          = data[0].averageRating;
        const reviews          = [];

        // fill ^reviews array with appropriate data:
        data.forEach( review => reviews.push(
          {
            name        : review.reviewerName, 
            avatar      : review.reviewerAvatar,
            date        : review.reviewDate, 
            rating      : review.reviewRating, 
            review      : review.reviewText,
            productImage: review.productImage,
            productTitle: review.productTitle
          }
        ));

        // set the state with new data:
        this.setState({
          currentSellerID      : currentSellerID,
          currentSeller        : currentSeller,
          currentProductID     : currentProductID,
          currentAverageRating : average,
          currentReviews       : reviews
        })
      })
      .catch( err => console.log(`Error retrieving seller info for id ${id}:\n${err}`) );
  }

  // Retrieve and use randomly chosen seller on refresh
  componentDidMount() {
    axios
      .get('/reviews/sellers')
      .then( res => {
        
        const ids  = [];
        const data = res.data

        data.forEach( id => {
          ids.push(id.listingID)
        })
        let randomId = ids[Math.floor(Math.random() * (101 - 1)) + 1]
        this.retrieveSeller(randomId);
      })
      .catch( err => console.log(`Error retrieving listing IDs from DB ${err}`));
  }

  render() {
    this.reviewChannel.onmessage = (e) => {
      this.retrieveSeller(e.data);
    }

    console.log(`Rendering reviews for: \n
                 Seller:   ${this.state.currentSeller}\n
                 SellerID: ${this.state.currentSellerID}\n
                 Product:  ${this.state.currentReviews[0].productTitle}`)

    return (
      <Container>
        <Col>
          <span className='reviewsHeader'>Reviews 
            <span className='averageStars'>
              <Average
                averageRating={this.state.currentAverageRating}
                totalReviews={this.state.currentReviews.length}
              />
            </span>
          </span>
        </Col>
        <Row>
          <Col>
            <MasterReviewList 
              currentReviews     ={this.state.currentReviews}
              moreClicked        ={this.state.moreClicked}
              readAllClicked     ={this.state.readAllClicked}
              handleReadAllClick ={this.handleReadAllReviewsClick}
            />
          </Col>
        </Row>
        <Row>
          <Col>
              {this.state.moreClicked === true ?
              this.state.readAllClicked === true ? <span /> : 
                <Button 
                  className ='readAllReviews' 
                  variant   ="dark" 
                  size      ="lg"
                  onClick   ={this.handleReadAllReviewsClick}>
                    Read All Reviews ({this.state.currentReviews.length-11})
                </Button> : 
                <span 
                  className ='plusMore' 
                  onClick   ={this.handleMoreClick}>
                    + More
                </span>}
          </Col>
        </Row>
        <Row><p /></Row>
      </Container>
    );
  }

}

export default App;