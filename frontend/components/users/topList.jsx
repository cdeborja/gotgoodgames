var React = require('react');

var TopList = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  goToGame: function (e) {
    this.context.router.push('/games/' + e.currentTarget.id);
  },

  goToUserShowpage: function (e) {
    this.context.router.push('/users/' + e.currentTarget.id);
  },

  render: function () {

    if (this.props.users.length === 0 || !this.props.users[0].reviewsCount) return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);
    for (var i = 0; i < this.props.users.length; i++) {
      if (Object.keys(this.props.users[i]).includes("reviews")) {
        return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);
      }
    }
    var that = this;

    function compare(a,b) {
      if (a.reviewsCount > b.reviewsCount)
        return -1;
      if (a.reviewsCount < b.reviewsCount)
        return 1;
      return 0;
    }
    var sortedByReviews = this.props.users.sort(compare);
    var topFive = sortedByReviews.map( function (user, id) {
      var times = user.reviewsCount.toString();
      return (
        <li className="top-user group" key={user.id} id={user.id}>
          <div className="image-container" onClick={that.goToUserShowpage}>
            <img className="cover" id={user.id} src={user.picture}/>
          </div>
          <div className="top-user-info">
            <div>
              <div className="username" id={user.id} onClick={that.goToUserShowpage}>
                {user.username}
              </div>
              has reviewed {times} games
            </div>
            <div>
              Recently reviewed
              <div id={user.recentlyReviewedGame.id} className="recentActivity" onClick={that.goToGame}>
                {user.recentlyReviewedGame.title}
              </div>
            </div>
          </div>
        </li>);
    });

    return (
      <div className="top-all-time-users-container group">
        <h2>Top All Time Users</h2>
        <ul className="top-all-time-users">
          {topFive}
        </ul>
      </div>
    );
  }
});

module.exports = TopList;
