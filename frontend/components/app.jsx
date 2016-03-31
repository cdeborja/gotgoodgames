var React = require('react');
var GamesIndex = require('./games/index');
// var ReviewsIndex = require('./reviews/index');

module.exports = React.createClass({

  render: function () {
    return(
      <div id="game-container">
      <div className="header-welcome-text">Hey there! Welcome back!</div>
        {this.props.children}
      </div>
    );
  }
});
