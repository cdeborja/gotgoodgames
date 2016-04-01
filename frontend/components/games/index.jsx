var React = require('react');
var GameStore = require('../../stores/game');
var ApiUtil = require('../../util/apiUtil');
var GameIndexItem = require('./indexItem.jsx');
var AppDispatcher = require('../../dispatcher/dispatcher');

module.exports = React.createClass({
  getInitialState: function () {
    return { games: GameStore.all() };
  },

  _onChange: function () {
    console.log("IM HERE!");
    this.setState({ games: GameStore.all() });
  },

  componentDidMount: function () {
    this.gameListener = GameStore.addListener(this._onChange);
    ApiUtil.fetchAllGames();
  },

  componentWillUnmount: function () {
    this.gameListener.remove();
  },

  render: function () {

    if ( !this.state.games ) {return (<div className="loading"> LOADING!!! </div>);}

    return(
      <div className="game-index-pane">
      <h2>Current games in the database!</h2>
      <ul>

        {this.state.games.map(function (game) {
          return (
          <GameIndexItem key={game.id} game={game} />
          );
        })}
        </ul>
      </div>
    );
  }
});
