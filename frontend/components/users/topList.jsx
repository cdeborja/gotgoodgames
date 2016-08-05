var React = require('react');

var TopList = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  goToUserShowpage: function (e) {
    this.context.router.push('/users/' + e.currentTarget.id);
  },

  render: function () {
    if (this.props.users.length === 0 || !this.props.users[0].reviews) return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);

    var that = this;
    var topFive = this.props.users.map( function (user, id) {
      var times = user.reviews.toString();
      return (<li className="top-user" key={user.id} id={user.id} onClick={that.goToUserShowpage}>
        <img src={user.picture}/><p> {user.username} has reviewed {times} times</p></li>);
    });

    return (
      <div>
        <h2>Top All Time Users</h2>
        <ul className="top-all-time-users">
          {topFive}
        </ul>
      </div>
    );
  }
});

module.exports = TopList;
