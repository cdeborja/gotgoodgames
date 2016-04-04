var React = require('react');
var GameStore = require('../../stores/game');
var ApiUtil = require('../../util/apiUtil');
var ReviewsIndexItem = require('../reviews/index');
var ReviewStore = require('../../stores/review');
var SessionStore = require('../../stores/session');
var ReviewForm = require('../reviews/reviewForm');

module.exports = React.createClass({
  getStateFromStore: function () {
    return { game: GameStore.find(parseInt(this.props.params.gameId)),
             body: "",
             score: null };
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

  handleErrors: function () {

  },

  handleSubmit: function(e) {
    e.preventDefault();


    var user_id = SessionStore.currentUser().id;
    var reviewParams = {
      review: {
        user_id: user_id,
        game_id: this.state.game.id,
        score: this.state.score,
        body: this.state.body,
      }
    };
    ApiUtil.createReview(reviewParams);
  },

  updateScore: function (e) {
    this.setState({ score: e.currentTarget.value});
  },

  updateReview: function (e) {
    this.setState({ body: e.currentTarget.value});
  },

  render: function () {
    var game = this.state.game;
    if ( !game || !game.reviews) {return (<div className="loading"> AHHH DON'T LOOK AT ME! I AM NOT READY!!!</div>);}
    var gameReviews = game.reviews.map(function (review, id) {
      return <ReviewsIndexItem key={id} review={review} />;
    }).reverse();

    var totalScore = 0;
    game.reviews.forEach( function(review) {
      totalScore += review.score;
    });

    var averageScore = (totalScore / game.reviews.length).toFixed(2);
    return(
      <div className="game-detail-pane">
          <h2>Title: {game.title}</h2>
          <ul>
            <img></img>
            <li>Average Score: {averageScore}</li>
            <li>Console: {game.console}</li>
            <li>Release Date: {game.release_date}</li>
            <li>Description: {game.description}</li>
          </ul>
          <div>
            <ReviewForm game={this.state.game} />
          </div>

          <ul>
            {gameReviews}
          </ul>


      </div>
    );
  }

});
