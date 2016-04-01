var React = require('react');
var GameStore = require('../../stores/game');
var ApiUtil = require('../../util/apiUtil');
var ReviewsIndexItem = require('../reviews/index');

module.exports = React.createClass({
  getStateFromStore: function () {
    return { game: GameStore.find(parseInt(this.props.params.gameId)) };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
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

  handleSubmit: function(e) {
    e.preventDefault();

    reviewParams = {reviewId: this.state.game.id, userId: 1 }
    ApiUtil.addReview(reviewParams);
  },


  // In the scoring part of the form, can either user input type range for 0-100 or number
  render: function () {

    var game = this.state.game;
    if ( !game || !game.reviews) {return (<div className="loading"> LOADING!!! </div>);}
    var gameReviews = game.reviews.map(function (review, id) {
      return <ReviewsIndexItem key={id} review={review} />;
    });

    return(

      <div className="game-detail-pane">
          <h2>Title: {game.title}</h2>
          <ul>
            <li>Score: PUT SCORE HERE LATER</li>
            <li>Console: {game.console}</li>
            <li>Release Date: {game.release_date}</li>
            <li>Description: {game.description}</li>
          </ul>
          <h1>Add your own review!</h1>
          <form className="input-box" onSubmit={this.handleSubmit}>

            <label className="input-text" htmlFor="score">
              Score
            </label>
            <input className="" type="number" />

            <label className="input-text" htmlFor="review">Review Box</label>
            <input className="input-field" type="text"/>

            <button className="submit-button">Add your review</button>

          </form>


          <ul>
            {gameReviews}
          </ul>
      </div>
    );
  }
});
