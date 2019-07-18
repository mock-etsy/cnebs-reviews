import React            from "react";
import axios            from 'axios';
import Container        from 'react-bootstrap/Container';
import Row              from 'react-bootstrap/Row';
import Col              from 'react-bootstrap/Col';
import Average          from "./components/average-rating.jsx";
import Button           from "react-bootstrap/Button";
import Spinner          from 'react-bootstrap/Spinner';
import MasterReviewList from "./components/master-review-list.jsx"
import ReviewerPhotos   from "./components/reviewer-photos.jsx";
import SellerFooterInfo from "./components/seller-information.jsx"
// import MeetTheOwner     from "./components/meet-the-owner.jsx"

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loading               : false,
      moreClicked           : false,
      readAllClicked        : false,
      currentSellerID       : 'Initial State Seller ID Placeholder',
      currentSellerUsername : 'Initial State Seller Username Placeholder',
      currentSeller         : 'Initial State Seller Name Placeholder',
      currentSellerAvatar   : 'https://s3.amazonaws.com/uifaces/faces/twitter/SlaapMe/128.jpg',
      currentProductID      : 'Initial State Product ID Placeholder',
      currentAverageRating  : 2.5,
      sellerIds             : [],
      currentReviews        : [ 
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

  // Handle clicking [ More + ] button:
  handleMoreClick() {
    this.setState({moreClicked:true});
  }

  // Handle clicking [ Read All Reviews ] button:
  handleReadAllReviewsClick() {
    this.setState({readAllClicked:true});
  }

  // Retrieve a seller (now using a product listing ID from message bus):
  retrieveSeller(id) {
    this.setState({loading: true});
    axios
      .get(`http://regretsyreviews-env.5sjqpmny7c.us-east-2.elasticbeanstalk.com/reviews/sellers/product/${id}`)
      // .get(`/reviews/sellers/product/${id}`)
      .then( res => {
        const data = res.data;
        
        // define variables to modify state, using DB data:
        const currentSellerID       = data[0].sellers_ID;
        const currentSellerUsername = data[0].sellerUsername;
        const currentSeller         = data[0].sellerName;
        const currentProductID      = data[0].listingID;
        const currentSellerAvatar   = data[0].sellerAvatar
        const average               = data[0].averageRating;

        // Will hold all seller's reviewer's information as objects inside the array
        const reviews               = [];

        // fill ^reviews array with appropriate review data:
        data.forEach( review => reviews.push(
          {
            name         : review.reviewerName, 
            avatar       : review.reviewerAvatar,
            date         : review.reviewDate, 
            rating       : review.reviewRating, 
            review       : review.reviewText,
            productImage : review.productImage,
            productTitle : review.productTitle
          }
        ));

        // set the state with new data:
        this.setState({
          currentSellerID       : currentSellerID,
          currentSeller         : currentSeller,
          currentSellerUsername : currentSellerUsername,
          currentSellerAvatar   : currentSellerAvatar,
          currentProductID      : currentProductID,
          currentAverageRating  : average,
          currentReviews        : reviews,
          loading               : false
        })
      })
      .catch( err => console.log(`Error retrieving seller info for id ${id}:\n${err}`) );
  }

  // If no message bus data: render from randomly selected seller using listing id:
  componentDidMount() {
    axios
      .get('http://regretsyreviews-env.5sjqpmny7c.us-east-2.elasticbeanstalk.com/reviews/sellers')
      // .get('/reviews/sellers')
      .then( res => {
        
        const ids  = [];
        const data = res.data

        data.forEach( id => {
          ids.push(id.listingID)
        })
        console.log('Generating a random ID')
        let randomId = ids[Math.floor(Math.random() * (101 - 1)) + 1]
        this.retrieveSeller(randomId);
      })
      .catch( err => console.log(`Error retrieving listing IDs from DB ${err}`));
  }

  render() {
    // Listen for a product listing ID from message bus:
    this.reviewChannel.onmessage = (e) => {
      console.log(`Reviews recieved listing ID ${e.data} on channel 'regretfully'`);
      this.retrieveSeller(e.data);
    }

    // Log source of rendering from state:
    console.log(`Rendering reviews for: \n
                 ProductID: ${this.state.currentProductID}`)

    // Return our microservice:
    return (
      <Container>

        {/* Reviews Header & Average Star Ratings */}
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


        {/* Conditionally Rendering Review List */}
        <Row>
          <Col>
            {
              this.state.loading === true ? 

              <Row>
                <Col></Col>
                <Col>
                  <div className="reviewsLoadingSpinnerContainer">
                    <Spinner animation="border" role="status" size="lg">
                      <span className="reviewsLoadingSpinner"></span>
                    </Spinner>
                  </div>
                </Col>
                <Col></Col>
              </Row> :

              <MasterReviewList
                currentReviews     ={this.state.currentReviews}
                moreClicked        ={this.state.moreClicked}
                readAllClicked     ={this.state.readAllClicked}
                handleReadAllClick ={this.handleReadAllReviewsClick}
              />
            }
          </Col>
        </Row>


        {/* Conditionally Rendering Expansion Buttons */}
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
        <Row><p className="reviewListFooter"/></Row>


        {/* Carousel (not yet) of Reviewer Product Images */}
        <Row>
          <ReviewerPhotos />
        </Row>
        <Row>
          <p className="reviewsFooter"/>
        </Row>

          <div className="reviewsLineBreakHeader"></div>
          <span> <hr className="reviewsFooterLineBreak"></hr> </span>


        {/* Current Seller Information */}
        <Row><p className="reviewsSellerInfoHeader" /></Row>
          <SellerFooterInfo 
            currentSellerAvatar   ={this.state.currentSellerAvatar}
            currentSellerUsername ={this.state.currentSellerUsername}
            currentAverageRating  ={this.state.currentAverageRating}
            numberOfReviews       ={this.state.currentReviews.length}
          />
        <Row><p className="reviewsSellerInfoFooter" /></Row>


        {/* Horizontal Line */} 
        <Row>       
        <span> <hr className="reviewsFooterLineBreak"></hr> </span>
        </Row>
      </Container>
    );
  }

}

export default App;