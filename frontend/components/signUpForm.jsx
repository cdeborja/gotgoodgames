var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ErrorStore = require('../stores/error');
var ApiUtil = require('../util/apiUtil');

var SignUpForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  mixins: [LinkedStateMixin],


  getStateFromStore: function() {
    return {
      username: "",
      password: "",
      errors: ErrorStore.all()
    };
  },

  getInitialState: function() {
    return (this.getStateFromStore() );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var router = this.context.router;
    ApiUtil.signUp(this.state, function() {
      router.push("/signup");
    });
    ApiUtil.login(this.state, function() {
      router.push("/landingPage");
    });
  },

  updateUsername: function(e) {
    this.setState({ username: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  },

  componentDidMount: function () {
    this.errorListener = ErrorStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.errorListener.remove();
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  render: function() {

    return (
      <div className="sign-in-box group">
        <h1>Sign Up</h1>

        <form className="input-box" onSubmit={this.handleSubmit}>

          <label className="input-text" htmlFor="username">
            Username
          </label>
          <input placeholder="How would you like to be known here?"
          className="input-field-login" type="text"
          valueLink={this.linkState('username')}/>

          <label className="input-text" htmlFor="password">Password</label>
          <input className="input-field-login" onChange={this.updatePassword}
          type="password" value={this.state.password}
          placeholder="Is that secret enough???"/>

          <button className="create-new-user-button">Create New User</button>

        </form>
      </div>
    );
  },

});

module.exports = SignUpForm;
