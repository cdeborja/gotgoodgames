var React = require('react');

module.exports = React.createClass({
  render: function () {
    if (this.props.review === []) { return (<div></div>); }
    return(
      <ul className="review-box">
        <li>Review Score: {this.props.review.score}</li>
        <li>Game ID: {this.props.review.game_id}</li>
        <li>Review: {this.props.review.body}</li>
      </ul>
    );
  }

});
