var React = require('react');
var GameStore = require('../../stores/game');
var ApiUtil = require('../../util/apiUtil');
var ReviewsIndexItem = require('../reviews/index');
var ReviewStore = require('../../stores/review');

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
            <input className="input-field" onChange={this.updateScore}
            type="number" value={this.state.score}/>

            <label className="input-text" htmlFor="review">Review Box</label>
            <input className="input-field" onChange={this.updateReview}
            type="text" value={this.state.review}/>

            <button className="submit-button">Add your review</button>

          </form>


          <ul>
            {gameReviews}
          </ul>
      </div>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var user_id = SessionStore.currentUser().id;

    var reviewParams = {
      review: {
      user_id: user_id,
      game_id: this.state.game.id,
      score: this.state.score,
      body: this.state.body
      }
    };
    ApiUtil.createReview(reviewParams);
  },

  updateScore: function (e) {
    this.setState({ score: e.currentTarget.value});
  },

  updateReview: function (e) {
    this.setState({ body: e.currentTarget.value});
  }

});
