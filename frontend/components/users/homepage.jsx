var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var AppDispatcher = require('../../dispatcher/dispatcher');

var UserStore = require('../../stores/user');

module.exports = React.createClass({
  getStateFromStore: function () {
    return { user: SessionStore.currentUser,
             reviews: SessionStore.currentUser.reviews
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
    this.gameListener = GameStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.gameListener.remove();
  },

  handleSubmit: function(e) {
  },

  render: function () {

    return(
      <div></div>
    );
  }

});
