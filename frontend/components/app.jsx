var React = require('react');
var GamesIndex = require('./games/index');

module.exports = React.createClass({

  render: function () {
    return(
      <div id="game-container">
      <div className="input-text">Hey there! Welcome back!</div>
        {this.props.children}
      </div>
    );
  }
});
