var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  mixins: [History],

  showDetail: function () {
    this.history.pushState(null, '/games/' + this.props.game.id, {});
  },

  render: function () {
    return(
      <li onClick={this.showDetail} className="game-detail-item">
        <p>Game Title: {this.props.game.title}</p>
      </li>
    );
  }
});
