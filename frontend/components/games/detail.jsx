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
      <div>
        <div className="game-detail-pane">
          <div className="detail">
          THIS IS THE GAME DETAIL AREA
          </div>
        </div>
      </div>
    );
  }
});
