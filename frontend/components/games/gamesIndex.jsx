var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var AppDispatcher = require('../../dispatcher/dispatcher');
var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');
var GameStore = require('../../stores/game');
var UserReviewItem = require('../reviews/userReviewIndex');
var EditUserForm = require('../users/editUserForm');

var page = 1;

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
    ApiUtil.fetchAllGames(page);
    this.isBottom();
  },

  componentWillUnmount: function () {
    this.gameListener.remove();
  },

  isBottom: function(){

    if ( SessionStore.currentUser().id !== undefined ){
      $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
          ApiUtil.fetchAllGames(page + 1);
          page ++;
        }
      });
    }

  },

  render: function () {
    if (this.state.games.length === 0) {
      return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);
    }
    var that = this;
    var gamesIndex = this.state.games.map(function (game) {
      var rating = game.averageRating.toFixed(2);
      return (<li className="boxed-item" key={game.id} id={game.id} onClick={that.goToGame}>
                <img className="index-img" src={game.image_url}/>
                  <p className="index-name">{game.title}</p>
                  <p className="console-name">{game.console}</p>
                  <p className="index-score"> average score: {rating}</p>
                </li>);
    });

    return(
    <div className="content-container group">
      <div className="game-index-box">
        <h2>All Games</h2>
        <ul>
          {gamesIndex}
        </ul>
      </div>
    </div>
    );
  }

});
