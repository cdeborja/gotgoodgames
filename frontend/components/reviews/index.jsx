var React = require('react');

module.exports = React.createClass({
  render: function () {
    if (this.props.reviews === []) return (<div></div>);

    return(
      <div>
        <div className="review-box">
          <ul>
          <li>Review Score: {this.props.review.score}</li>
          <li>Reviewer ID: {this.props.review.user_id}</li>
          <li>Review: {this.props.review.body}</li>
          </ul>
        </div>

      </div>
    );
  }

});
