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
    debugger;
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
