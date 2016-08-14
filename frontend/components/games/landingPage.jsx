var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var AppDispatcher = require('../../dispatcher/dispatcher');
var Slider = require('react-slick');

var GameStore = require('../../stores/game');

var GameDatabaseSlider = require('./gameDatabaseSlider');
var TopList = require('../users/topList');
var TopGames = require('./topGames');
var MostReviewedGames = require('./mostReviewedGames');

module.exports = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getStateFromStore: function () {
    return ({ games: GameStore.all()
           });
  },

  getInitialState: function () {
    return (this.getStateFromStore());
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  componentDidMount: function () {
    this.gameListener = GameStore.addListener(this._onChange);
    ApiUtil.fetchAllGames();
  },

  componentWillUnmount: function () {
    this.gameListener.remove();
  },

  render: function () {

    if ( (this.state.games.length < 1) ) {return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);}

    return(
      <div className="content-container group">
        <div className="content-game-lists">
          <GameDatabaseSlider games={this.state.games}/>
        </div>
        <div className="content-container-bottom group">
          <TopGames games={this.state.games}/>
          <MostReviewedGames games={this.state.games}/>
          <TopList/>
        </div>
      </div>
    );
  }
});
