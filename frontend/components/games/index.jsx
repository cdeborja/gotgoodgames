var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var AppDispatcher = require('../../dispatcher/dispatcher');

var GameStore = require('../../stores/game');
var GameIndexItem = require('./indexItem.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return { games: GameStore.all() };
  },

  _onChange: function () {
    this.setState({ games: GameStore.all() });
  },

  componentDidMount: function () {
    this.gameListener = GameStore.addListener(this._onChange);
    ApiUtil.fetchAllGames();
  },

  componentWillUnmount: function () {
    this.gameListener.remove();
  },

  render: function () {

    if ( !this.state.games ) {return (<div className="loading"> LOADING!!! </div>);}

    return(
      <div className="content-container group">
        <div className="content-feed">
          <div className="feed-buttons group">
            <ul>
            <li>Updates</li>
            <li>Discussions</li>
            </ul>
          </div>
          <ul className="feed-display group">

              <li className="recent-activity-item group">
                <img src="http://i280.photobucket.com/albums/kk197/chanhonglok/naruto/5a1c4ba4.gif"/>
                <div className="feed-information">
                  <h2>Sasuke reviewed... </h2>
                  <div className="recent-activity">
                    <img src="https://upload.wikimedia.org/wikipedia/en/4/4b/Fftbox.jpg" />
                    <div className="comment-activity">
                      <ul>
                        <li>Final Fantasy Tactics --- 1/5</li>
                        <li>Naruto and Sakura made me play this...</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              <li className="recent-activity-item group">
                <img src="http://vignette4.wikia.nocookie.net/nintendo/images/4/44/Luigi-Icon.png/revision/latest?cb=20120820000627&path-prefix=en"/>
                <div className="feed-information">
                  <h2>Luigi reviewed... </h2>
                  <div className="recent-activity">
                    <img src="http://img.gamefaqs.net/box/0/7/5/22075_front.jpg" />
                    <div className="comment-activity">
                      <ul>
                        <li>Mario is missing!--- 2/5</li>
                        <li>Mama Mia! I had to travel around the WORLD to find him!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

          </ul>
        </div>
        <div className="content-game-lists">

          <div className="your-class">
            <div>your content</div>
            <div>your content</div>
            <div>your content</div>
          </div>
        </div>
      </div>
    );
  }
});
