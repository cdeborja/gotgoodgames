var React = require('react');
var GamesIndex = require('./games/index');

module.exports = React.createClass({

  render: function () {
    return(
      <div id="game-container">
        <div className="game-index-pane">
          <GamesIndex />
        </div>
        {this.props.children}
      </div>
    );
  }
});
