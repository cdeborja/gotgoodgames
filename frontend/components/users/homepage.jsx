var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var AppDispatcher = require('../../dispatcher/dispatcher');
var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');
var ReviewStore = require('../../stores/review');

module.exports = React.createClass({
  getStateFromStore: function () {
    return { user: SessionStore.currentUser(),
             reviews: ReviewStore.all()
           };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return (this.getStateFromStore() );
  },

  componentWillReceiveProps: function () {
  },

  componentDidMount: function () {
    this.reviewListener = ReviewStore.addListener(this._onChange);
    ApiUtil.fetchUserReviews(review={user_id: this.state.user.id});
  },

  componentWillUnmount: function () {
    this.reviewListener.remove();
  },

  handleSubmit: function(e) {
  },

  render: function () {
    return(
      <div>
        <h2>Got into User Page!</h2>
        <li>{this.state.reviews.length}</li>
      </div>
    );
  }

});
