import React from "react";
import Average from "./components/average-rating.jsx"
import ReviewList from "./components/review-list.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div>
      <h1>Reviews</h1>
      <span>Average Reviews</span>
      <Average />
      <ReviewList />
    </div>
    );
  }

}

export default App;