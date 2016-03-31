var React = require('react');
var GameStore = require('../../stores/game');
var ApiUtil = require('../../util/apiUtil.js');
// var ToysIndex = require('../toys/index.jsx');

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
    if(this.state.game === undefined) { return (<div>EMPTY</div>); }

    return(
      <div className="game-index-pane">
          <h2>Title: {this.state.game.title}</h2>
          <ul>
            <li></li>
            <li>Release Date: {this.state.game.release_date}</li>
            <li>Description: {this.state.game.description}</li>

          </ul>
      </div>
    );
  }
});
