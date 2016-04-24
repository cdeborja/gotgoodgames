var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var AppDispatcher = require('../../dispatcher/dispatcher');
var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');
var GameStore = require('../../stores/game');
var UserReviewItem = require('../reviews/userReviewIndex');
var EditUserForm = require('../users/editUserForm');

module.exports = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  getStateFromStore: function () {
    return { games: GameStore.all(),
           };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return (this.getStateFromStore() );
  },

  goToGame: function (e) {
    this.context.router.push('/games/' + e.currentTarget.id);
  },

  componentDidMount: function () {
    this.gameListener = GameStore.addListener(this._onChange);
    ApiUtil.fetchAllGames();
  },

  componentWillUnmount: function () {
    this.gameListener.remove();
  },

  render: function () {
    if (this.state.games.length === 0) {
      return (<div className="loading"> Loading... </div>);
    }
    var that = this;
    var gamesIndex = this.state.games.map(function (game) {
      return (<li key={game.id} id={game.id} onClick={that.goToGame}><img src={game.image_url}/><p>{game.title}</p></li>);
    });

    return(
    <div className="content-container group">
      <div className="game-index-box">
        <h2>All current games</h2>
        <ul className="games-index">
          {gamesIndex}
        </ul>
      </div>
    </div>
    );
  }

});