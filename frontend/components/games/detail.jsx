var React = require('react');
var GameStore = require('../../stores/game');
var ApiUtil = require('../../util/apiUtil');
var ReviewsIndexItem = require('../reviews/index');
var ReviewStore = require('../../stores/review');
var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');
var ReviewForm = require('../reviews/reviewForm');

module.exports = React.createClass({
  getStateFromStore: function () {
    return { game: GameStore.find(parseInt(this.props.params.gameId)),
             users: UserStore.all()
            };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return (this.getStateFromStore() );
  },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSingleGame(parseInt(newProps.params.gameId));
  },

  componentDidMount: function () {
    this.gameListener = GameStore.addListener(this._onChange);
    this.userListener = UserStore.addListener(this._onChange);
    ApiUtil.fetchSingleGame(parseInt(this.props.params.gameId));
    ApiUtil.fetchAllReviewedUsers({game_id: this.props.params.gameId});
  },

  componentWillUnmount: function () {
    this.userListener.remove();
    this.gameListener.remove();
  },

  render: function () {
    var game = this.state.game;
    var userReview = null;

    if ( !game || !game.reviews) {return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);}
    var gameReviews = game.reviews.map(function (review, id) {
      return <ReviewsIndexItem key={id} review={review}/>;
    }).reverse();

    gameReviews.forEach (function (review) {
      if (review.props.review.user_id === SessionStore.currentUser().id) {
        userReview = review.props.review;
      }
    });
    var averageRating = game.averageRating.toFixed(2);

    return(
      <div className="content-container group">
        <div className="game-information-box group">
          <div className="game-details-left">
            <img src={game.image_url} />
            <div>
              <ReviewForm game={this.state.game} reviews={gameReviews} userReview={userReview}/>
            </div>
          </div>
          <div className="game-details-right">
            <h2>{game.title}</h2>
            <ul className="game-details">
              <li><b>Average Score:</b> {averageRating} out of 5</li>
              <li><b>Release Date:</b> {game.release_date}</li>
              <li><b>Console:</b> {game.console}</li>
              <li><b>Game Description:</b> {game.description}</li>
            </ul>
          </div>
        </div>

        <div className="recent-reviews-box">
          {gameReviews}
        </div>
      </div>
    );
  }

});
