var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var AppDispatcher = require('../../dispatcher/dispatcher');
var SessionStore = require('../../stores/session');
var UserStore = require('../../stores/user');

module.exports = React.createClass({
  getStateFromStore: function () {
    return { user: SessionStore.currentUser(),
             reviews: SessionStore.currentUser().reviews
           };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return (this.getStateFromStore() );
  },

  componentWillReceiveProps: function (newProps) {
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(this._onChange);
    ApiUtil.fetchUserReviews(review={user_id: this.state.user.id});
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  handleSubmit: function(e) {
  },

  render: function () {
    return(
      <div>Got into User Page!</div>
    );
  }

});
