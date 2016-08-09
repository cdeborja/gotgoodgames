var React = require('react');

var MostReviewedGames = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  goToGame: function (e) {
    this.context.router.push('/games/' + e.currentTarget.id);
  },

  render: function () {

    if (this.props.games.length === 0) return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);

    var that = this;
    //reorders by top user
    function compare(a,b) {
      if (a.reviewCount > b.reviewCount)
        return -1;
      if (a.reviewCount < b.reviewCount)
        return 1;
      return 0;
    }

    //creates a duplicate so that we are not affecting the original state
    var games = this.props.games.slice(0);
    var sortedByReviewCount = games.sort(compare);
    var topFive = sortedByReviewCount.slice(0,5);
    var topFiveRender = topFive.map( function (game, id) {
      var rating = game.averageRating.toFixed(2);
      return (
        <li className="top-game group" key={game.id} id={game.id}>
          <div className="image-container" id={game.id} onClick={that.goToGame}>
            <img className="cover" src={game.image_url}/>
          </div>
          <div className="top-game-info">
            <div>
              <div className="username" id={game.id} onClick={that.goToGame}>
                {game.title}
              </div>
              <div>
                has been reviewed {game.reviewCount} times
              </div>
              <div>
                with an average score of {rating}
              </div>
            </div>
          </div>
        </li>);
    });

    return (
      <div className="top-rated-games-container group">
        <h2>Most Reviewed Games</h2>
        <ul className="top-rated-games">
          {topFiveRender}
        </ul>
      </div>
    );
  }
});

module.exports = MostReviewedGames;
