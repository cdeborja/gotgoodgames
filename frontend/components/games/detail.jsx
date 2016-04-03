var React = require('react');
var GameStore = require('../../stores/game');
var ApiUtil = require('../../util/apiUtil');
var ReviewsIndexItem = require('../reviews/index');
var ReviewStore = require('../../stores/review');
var SessionStore = require('../../stores/session');

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
  //Need to fix the date ordering

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
          <h1>Add your own review!</h1>
          <form className="input-box" onSubmit={this.handleSubmit}>

            <label className="input-text" htmlFor="score">
              Score
            </label>

            <ul>
              <li>
              <label>1</label>
              <input className="input-field" type="radio" value="1" name="gameScore"
              onChange={this.updateScore}/>
              </li>
              <li>
              <label>2</label>
              <input className="input-field" type="radio" value="2" name="gameScore"
              onChange={this.updateScore}/>
              </li>
              <li>
              <label>3</label>
              <input className="input-field" type="radio" value="3" name="gameScore"
              onChange={this.updateScore}/>
              </li>
              <li>
              <label>4</label>
              <input className="input-field" type="radio" value="4" name="gameScore"
              onChange={this.updateScore}/>
              </li>
              <li>
              <label>5</label>
              <input className="input-field" type="radio" value="5" name="gameScore"
              onChange={this.updateScore}/>
              </li>
            </ul>

            <label className="input-text" htmlFor="review">Review Box</label>
            <input className="input-field-box" placeholder="Enter your awwwwwsome review here!"
            onChange={this.updateReview} type="form-textarea" value={this.state.review}/>

            <button className="submit-button">Add your review</button>

          </form>


          <ul>
            {gameReviews}
          </ul>
      </div>
    );
  }

});
