var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');
var ReviewStore = require('../../stores/review');
var GameStore = require('../../stores/game');
var UserReviewItem = require('../reviews/userReviewIndex');

module.exports = React.createClass({
  contextTypes: {
     router: React.PropTypes.object
   },

  getStateFromStore: function () {
    var user_id = SessionStore.currentUser().id;

    return { user: UserStore.find(user_id),
             reviews: ReviewStore.all()
           };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return (this.getStateFromStore() );
  },

  componentDidMount: function () {
    this.reviewListener = ReviewStore.addListener(this._onChange);
    this.userListener = UserStore.addListener(this._onChange);
    ApiUtil.fetchUser(SessionStore.currentUser().id);
    ApiUtil.fetchUserReviews(SessionStore.currentUser().id);
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.reviewListener.remove();
  },

  goToEditProfile: function (e) {
    this.context.router.push({
      pathname: '/edit_user',
      query: {},
      state: { user: this.state.user }
    });
  },

  render: function () {
    if ((this.state.reviews.length === 0 && !this.state.user ) ||
       (!this.state.user) ){
      return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);
    }

    var userReviews;
    if (this.state.reviews.length > 0) {
      var currentUserId = SessionStore.currentUser().id;
      userReviews = this.state.reviews.map(function (review, id) {
        return <UserReviewItem currentUserId={currentUserId} key={id} userReview={review} ApiUtil={ApiUtil} />;
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
            <li>Reviews: {this.state.reviews.length}</li>
          </ul>
        </div>
        <div className="user-description-box">
          <h1>{this.state.user.username}</h1>
          <div>
            <p className="user-p">{this.state.user.description}</p>
            <button className="edit-profile hidden" onClick={this.goToEditProfile}>Edit Profile</button>
          </div>
        </div>
      </div>

      <div className="recent-reviews-box">
        <h2>Your Recent Activity!</h2>
        {userReviews}
      </div>
    </div>
    );
  }

});
