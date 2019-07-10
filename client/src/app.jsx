import React from "react";
import axios from 'axios';
import Average from "./components/average-rating.jsx"
import ReviewList from "./components/review-list.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentReviews : []
    }
  }

  // Update state of current reviews on component mount
  componentDidMount() {
    axios
      .get('/reviews/review')
      .then( res => {
        this.setState({
          currentReviews : res
        })
        let review = this.state.currentReviews
        console.log(review);
      })
  }

  render() {
    return (
    <div>
      <h1>Reviews</h1>
      <span>Average Reviews</span>

      <Average />

      <ReviewList 
        currentReviews={this.state.currentReviews}
      />
    </div>
    );
  }

}

export default App;