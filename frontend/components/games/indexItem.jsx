var React = require('react');
var GameStore = require('../../stores/game');

module.exports = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  showDetail: function () {
    this.context.router.push('/games/' + this.props.game.id);
  },

  render: function () {
    return(
      <li onClick={this.showDetail} className="game-detail-item">
        Game Title: {this.props.game.title}
      </li>
    );
  }
});
