var React = require('react');
var ReviewStore = require('../../stores/review');

var EditReview = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getStateFromStore: function () {
    return { review: ReviewStore.find(this.props.reviewId)
           };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return (this.getStateFromStore() );
  },

  goToReviewEdit: function () {
    this.context.router.push('/reviews/' + this.props.reviewId);
  },

  render: function () {
    return(
      <div>
        <button className="edit-button" onClick={this.goToReviewEdit}> Edit Review </button>
      </div>
    );
  }

});

module.exports = EditReview;
