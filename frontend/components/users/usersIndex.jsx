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
    return { users: UserStore.all(),
           };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return (this.getStateFromStore() );
  },

  goToUserShowpage: function (e) {
    this.context.router.push('/users/' + e.currentTarget.id);
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._onChange);
    ApiUtil.fetchAllUsers();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  render: function () {
    if (this.state.users.length === 0) {
      return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);
    }
    var that = this;
    var usersIndex = this.state.users.map(function (user) {
      return (<li className="boxed-item" key={user.id} id={user.id} onClick={that.goToUserShowpage}>
        <img src={user.picture}/><p>{user.username}</p></li>);
    });

    return(
    <div className="content-container group">
      <div className="game-index-box">
        <h2>All Users</h2>
        <ul>
          {usersIndex}
        </ul>
      </div>
    </div>
    );
  }

});
