var React = require('react');
var EditReviewLink = require('./editReviewLink');
var ApiUtil = require('../../util/apiUtil');


module.exports = React.createClass({
  getInitialState: function () {
    return {
      review: this.props.review
    };
  },

  deleteReview: function () {
    ApiUtil.deleteReview({review: this.state.review});
  },

  render: function () {
    var review = this.state.review;

    if (review === []) { return (<div></div>); }
    return(
      <ul className="review-box">
        <li>Review Score: {review.score}</li>
        <li>Game ID: {review.game_id}</li>
        <li>Review: {review.body}</li>
        <li><EditReviewLink reviewId={review.id}/></li>
        <button className="submit-button" onClick={this.deleteReview}>Delete Review</button>
      </ul>
    );
  }

});
