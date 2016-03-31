var React = require('react');
var GameStore = require('../../stores/game');
var ApiUtil = require('../../util/apiUtil');
var GameIndexItem = require('./indexItem.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return { games: GameStore.all() };
  },

  _onChange: function () {
    this.setState({ games: GameStore.all() });
  },

  componentDidMount: function () {
    this.gameListener = GameStore.addListener(this._onChange);
    ApiUtil.fetchAllGames();
  },

  compomentWillUnmount: function () {
    this.gameListener.remove();
  },

  render: function () {
    return(
      <div className="game-index-pane">
      <ul>
        Current games in the database!
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
