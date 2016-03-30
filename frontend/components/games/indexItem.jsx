var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
  // mixins: [History],

  // showDetail: function () {
  //   this.history.pushState(null, '/game/' + this.props.pokemon.id, {});
  // },
// onClick={this.showDetail} className="poke-list-item"
  render: function () {
    return(
      <li>
        <p>Name: {this.props.game.title}</p>
      </li>
    );
  }
});
