var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var AppDispatcher = require('../../dispatcher/dispatcher');
var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');
var ReviewStore = require('../../stores/review');
var GameStore = require('../../stores/game');
var UserReviewItem = require('../reviews/userReviewIndex');

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
    if (this.state.reviews.length === 0) {
      return <div className="loading"> Loading... </div>;
    }

    var userReviews = this.state.reviews.map(function (review, id) {
      return <UserReviewItem key={id} review={review} />;
    }).reverse();
    var memberSince = this.state.user.created_at.slice(0,10).split("-").join('/');
    return(
      <div className="game-detail-pane">
        <h2>{this.state.user.username}</h2>
        <ul>
          <li>Total Reviews: {this.state.reviews.length}</li>
          <li>Member Since: {memberSince}</li>
        </ul>
        <ul>{userReviews}</ul>
      </div>
    );
  }

});
