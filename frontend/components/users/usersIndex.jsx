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
      return (<div className="loading"> Loading... </div>);
    }
    var that = this;
    var usersIndex = this.state.users.map(function (user) {
      return (<li key={user.id} id={user.id} onClick={that.goToUserShowpage}><img src={user.picture}/><p>{user.username}</p></li>);
    });

    return(
    <div className="content-container group">
      <div className="game-index-box">
        <h2>All Signed Up Users</h2>
        <ul className="games-index">
          {usersIndex}
        </ul>
      </div>
    </div>
    );
  }

});