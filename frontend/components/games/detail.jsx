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

  render: function () {

    var game = this.state.game;

    if ( !game || !game.reviews) {return (<div className="loading"> LOADING!!! </div>);}

    return(

      <div className="game-index-pane">
          <h2>Title: {game.title}</h2>
          <ul>
            <li></li>
            <li>Console: {game.console}</li>
            <li>Release Date: {game.release_date}</li>
            <li>Description: {game.description}</li>
          </ul>
          <ul>
            {game.reviews.map(function (review, id) {
              return <ReviewsIndexItem key={id} review={review} />;
            })}
          </ul>
      </div>
    );
  }
});
