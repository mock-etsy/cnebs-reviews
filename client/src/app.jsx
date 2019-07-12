import React from "react";
import axios from 'axios';
import Average from "./components/average-rating.jsx"
import ReviewList from "./components/review-list.jsx"
// Temporarily use data from fake-data-file to render stuff:
import data from "../../database/data.js"

const fullData = data.data.data

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSeller        : fullData[0],
      currentAverageRating : fullData[0].reviewInfo.averageRating,
      currentReviews       : fullData[0].reviewInfo.reviews
    }
  }

  // Update state of current reviews on component mount
  // componentDidMount() {
  //   axios
  //     .get('/reviews/review/seller')
  //     .then( res => {

  //       let currentSeller = this.state.currentSeller;
  //       let sellerData    = res.data.data.currentSeller.reviewInfo;

  //       this.setState({
  //         currentReviews : res
  //       })
  //       let review = this.state.currentReviews
  //       console.log(review);
  //     })
  // }

  render() {
    return (
    <div>
      <h1>Reviews</h1>

      <Average 
        averageRating={this.state.currentAverageRating}
        totalReviews={this.state.currentReviews.length}
      />

      <ReviewList 
        currentReviews={this.state.currentReviews}
      />
    </div>
    );
  }

}

export default App;