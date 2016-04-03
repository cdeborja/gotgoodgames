var React = require('react');
var UserStore = require('../../stores/user');

module.exports = React.createClass({
  render: function () {
    if (this.props.review === []) { return (<div></div>); }
    return(
      <ul className="review-box">
        <li>Review Score: {this.props.review.score}</li>
        <li>Reviewer ID: {this.props.review.user_id}</li>
        <li>Review: {this.props.review.body}</li>
      </ul>
    );
  }

});
