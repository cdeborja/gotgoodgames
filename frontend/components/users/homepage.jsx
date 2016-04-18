var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var AppDispatcher = require('../../dispatcher/dispatcher');
var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');
var ReviewStore = require('../../stores/review');
var GameStore = require('../../stores/game');
var UserReviewItem = require('../reviews/userReviewIndex');
var EditUserForm = require('./editUserForm');

module.exports = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  getStateFromStore: function () {
    var user_id = SessionStore.currentUser().id;
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

  componentDidMount: function () {
    this.reviewListener = ReviewStore.addListener(this._onChange);
    this.sessionListener = SessionStore.addListener(this._onChange);
    ApiUtil.fetchUserReviews(this.state.user.id);
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
    this.reviewListener.remove();
  },

  goToEditProfile: function () {
    this.context.router.push({
      pathname: '/edit_user',
      query: {},
      state: { user: this.state.user }
    });
  },


  render: function () {
    if (this.state.reviews.length === 0 && !this.state.user ) {
      return (<div className="loading"> Loading... </div>);
    }
    var userReviews = this.state.reviews.map(function (review, id) {
      return <UserReviewItem key={id} review={review} />;
    }).reverse();


    // var memberSince = this.state.user.created_at.slice(0,10).split("-").join('/');

    return(
    <div className="content-container group">
      <div className="user-information-box group">
        <div className="user-information">
          <div className="user-picture">
            <img src={this.state.user.picture}/>
          </div>
          <ul className="stat-box">
            <h3>"Newbie"</h3>
            <li>Reviews: {this.state.reviews.length}</li>
          </ul>
        </div>
        <div className="user-description-box">
          <h1>{this.state.user.username}</h1>
          <p>{this.state.user.description}</p>
          <button onClick={this.goToEditProfile}>Edit Profile</button>
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
