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
    ApiUtil.fetchUserReviews({review: {user_id: this.state.user.id}});
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
            <h3>The Superstar</h3>
            <li>Reviews: 200</li>
          </ul>
        </div>
        <div className="user-description-box">
          <h1>Pikachu</h1>
          <p>
            Hello, it's me
            I was wondering if after all these years you'd like to meet
            To go over everything
            They say that time's supposed to heal ya
            But I ain't done much healing
          </p>
          <button>
            EDIT PROFILE
          </button>
        </div>
      </div>
      <div className="recent-reviews-box">
        <h2>Pikachu's Recent Activity!</h2>

        <ul className="user-review group">
          <div className="game-review-image group">
            <img src="http://rs306.pbsrc.com/albums/nn262/cuteshiek101/Icons/978287y6kuaab63k.gif~c200" />
            <p>GAMETITLE</p>
          </div>
          <div className="game-review-comment group">
            <h3>TITLE</h3>
            <p>Score</p>
            <span>COMMENTBOX</span>
          </div>
          <div className="edit-menu group">
            <button>EDIT</button>
            <button>DELETE</button>
          </div>
        </ul>

        <ul className="user-review group">
          <div className="game-review-image group">
            <img src="http://rs306.pbsrc.com/albums/nn262/cuteshiek101/Icons/978287y6kuaab63k.gif~c200" />
            <p>GAMETITLE</p>
          </div>
          <div className="game-review-comment group">
            <h3>TITLE</h3>
            <p>Score</p>
            <span>COMMENTBOX</span>
          </div>
          <div className="edit-menu group">
            <button>EDIT</button>
            <button>DELETE</button>
          </div>
        </ul>

        <ul className="user-review group">
          <div className="game-review-image group">
            <img src="http://rs306.pbsrc.com/albums/nn262/cuteshiek101/Icons/978287y6kuaab63k.gif~c200" />
            <p>GAMETITLE</p>
          </div>
          <div className="game-review-comment group">
            <h3>TITLE</h3>
            <p>Score</p>
            <span>COMMENTBOX</span>
          </div>
          <div className="edit-menu group">
            <button>EDIT</button>
            <button>DELETE</button>
          </div>
        </ul>

      </div>
    </div>
    );
  }

});
