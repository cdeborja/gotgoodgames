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
             reviews: ReviewStore.all(),
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
    ApiUtil.fetchUserReviews(this.state.user.id);
  },

  componentWillUnmount: function () {
    this.reviewListener.remove();
  },

  render: function () {
    if (this.state.reviews.length === 0) {
       <div className="loading"> Loading... </div>;
    }

    var userReviews = this.state.reviews.map(function (review, id) {
      return <UserReviewItem key={id} review={review} />;
    }).reverse();

    var memberSince = this.state.user.created_at.slice(0,10).split("-").join('/');

    return(
    <div className="content-container group">
      <div className="user-information-box group">
        <div className="user-information">
          <div className="user-picture">
            <img src="http://vignette3.wikia.nocookie.net/pokemon/images/1/16/025Pikachu_OS_anime_10.png/revision/20150102074354" />
          </div>
          <ul className="stat-box">
            <h3>The "Some"</h3>
            <li>Reviews: {this.state.reviews.length}</li>
          </ul>
        </div>
        <div className="user-description-box">
          <h1>{this.state.user.username}</h1>
          <p>{this.state.user.description}</p>
          <button>
            EDIT PROFILE
          </button>
        </div>
      </div>


      <div className="recent-reviews-box">
        <h2>Pikachu's Recent Activity!</h2>
        {userReviews}
      </div>
    </div>
    );
  }

});
