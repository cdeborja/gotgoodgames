var React = require('react');
var GameStore = require('../../stores/game');
var ApiUtil = require('../../util/apiUtil');
var ReviewsIndexItem = require('../reviews/index');
var ReviewStore = require('../../stores/review');
var SessionStore = require('../../stores/session');
var ReviewForm = require('../reviews/reviewForm');

module.exports = React.createClass({
  getStateFromStore: function () {
    return { game: GameStore.find(parseInt(this.props.params.gameId))};
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
    ApiUtil.fetchSingleGame(parseInt(this.props.params.gameId));
  },

  componentWillUnmount: function () {
    this.gameListener.remove();
  },

  render: function () {
    var game = this.state.game;
    var userReview = null;
    var averageScore = 0;
    if ( !game || !game.reviews) {return (<img className="loading-image" src="https://youthradio.org/innovationlab/for-teachers/images/loading.gif"/>);}
    var gameReviews = game.reviews.map(function (review, id) {
      return <ReviewsIndexItem key={id} review={review} review_id={review.id}/>;
    }).reverse();

    gameReviews.forEach (function (review) {
      if (review.props.review.user_id === SessionStore.currentUser().id) {
        userReview = review.props.review;
      }
    });
    var totalScore = 0;

    if (game.reviews.length > 0) {
      game.reviews.forEach( function(review) {
        totalScore += review.score;
      });
      averageScore = (totalScore / game.reviews.length).toFixed(2);
    }

    return(
      <div className="game-detail-pane">
          <h2>Title: {game.title}</h2>
          <ul>
            <img src={game.cover} />
            <li>Average Score: {averageScore}</li>
            <li>Console: {game.console}</li>
            <li>Release Date: {game.release_date}</li>
            <li>Description: {game.description}</li>
          </ul>
          <div>
            <ReviewForm game={this.state.game} reviews={gameReviews} userReview={userReview}/>
          </div>

          <ul>
            {gameReviews}
          </ul>


      </div>
    );
  }

});
