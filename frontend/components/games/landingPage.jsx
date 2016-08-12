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

// Implement Discussions Feed later!!!


// <div className="content-feed">
// <div className="feed-buttons group">
// <ul>
// <li>Updates</li>
// <li>Discussions</li>
// </ul>
// </div>
// <ul className="feed-display group">
//
// <li className="recent-activity-item group">
// <img src="http://i280.photobucket.com/albums/kk197/chanhonglok/naruto/5a1c4ba4.gif"/>
// <div className="feed-information">
// <h2>Sasuke reviewed... </h2>
// <div className="recent-activity">
// <img src="https://upload.wikimedia.org/wikipedia/en/4/4b/Fftbox.jpg" />
// <div className="comment-activity">
// <ul>
// <li>Final Fantasy Tactics --- 1/5</li>
// <li>Naruto and Sakura made me play this...</li>
// </ul>
// </div>
// </div>
// </div>
// </li>
//
// <li className="recent-activity-item group">
// <img src="http://vignette4.wikia.nocookie.net/nintendo/images/4/44/Luigi-Icon.png/revision/latest?cb=20120820000627&path-prefix=en"/>
// <div className="feed-information">
// <h2>Luigi reviewed... </h2>
// <div className="recent-activity">
// <img src="http://img.gamefaqs.net/box/0/7/5/22075_front.jpg" />
// <div className="comment-activity">
// <ul>
// <li>Mario is missing!--- 2/5</li>
// <li>Mama Mia! I had to travel around the WORLD to find him!</li>
// </ul>
// </div>
// </div>
// </div>
// </li>
//
// </ul>
// </div>
