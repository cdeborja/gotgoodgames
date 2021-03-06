var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');
var ReviewStore = require('../../stores/review');
var GameStore = require('../../stores/game');
var UserReviewItem = require('../reviews/userReviewIndex');

var page = 1;

module.exports = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  getStateFromStore: function () {
    return { user: UserStore.find(this.props.params.userId),
             reviews: ReviewStore.all(),
           };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return (this.getStateFromStore() );
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._onChange);
    this.reviewListener = ReviewStore.addListener(this._onChange);
    ApiUtil.fetchUser(this.props.params.userId);
    ApiUtil.fetchUserReviews(this.props.params.userId, page);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.reviewListener.remove();
  },

  render: function () {
    if (this.state.user === undefined || !this.state.user.reviews) {
      return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);
    }

    var userReviews;
    if (this.state.reviews.length > 0) {
      var currentUserId = SessionStore.currentUser().id;
      userReviews = this.state.reviews.map(function (review, id) {
        return <UserReviewItem ApiUtil={ApiUtil} key={id} currentUserId={currentUserId} userReview={review} />;
      }).reverse();
    } else {
      userReviews = <p>Nothing...yet</p>;
    }

    // var memberSince = this.state.user.created_at.slice(0,10).split("-").join('/');
    return(
    <div className="content-container group">
      <div className="user-information-box group">
        <div className="user-information">
          <img className="user-showpage-img" src={this.state.user.picture} />
          <ul className="stat-box">
            <h3>"Newbie"</h3>
            <li>Reviews: {this.state.user.reviews.length}</li>
          </ul>
        </div>
        <div className="user-description-box">
          <h1>{this.state.user.username}</h1>
          <div>
            <p>{this.state.user.description}</p>
          </div>
        </div>
      </div>


      <div className="recent-reviews-box">
        <h2>{this.state.user.username}'s Recent Activity!</h2>
        {userReviews}
      </div>
    </div>
    );
  }

});
