var React = require('react');
var EditReviewLink = require('./editReviewLink');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      review: this.props.review
    };
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
      </ul>
    );
  }

});
