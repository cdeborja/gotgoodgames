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

  signUp: function(e) {
    e.preventDefault();
    var router = this.context.router;
    ApiUtil.signUp(this.state);
    ApiUtil.login(this.state, function() {
      router.push("/landingPage");
    });
  },

  goBack: function(e) {
    e.preventDefault();
    this.context.router.push("/login");
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
        <div className="login-error hidden">Unacceptable username/password combination</div>

        <form className="input-box">


          <input placeholder="Think of something good!"
          className="input-field-login" type="text"
          valueLink={this.linkState('username')}/>
          <label className="input-text" htmlFor="username">
          Username
          </label>

          <input className="input-field-login" onChange={this.updatePassword}
          type="password" value={this.state.password}
          placeholder="Minimum 6 characters password"/>
          <label className="input-text" htmlFor="password">Password</label>

          <div className="button-box group">
            <button onClick={this.goBack} className="create-new-user-button">Go Back</button>
            <button onClick={this.signUp} className="create-new-user-button">Create New User</button>
          </div>
        </form>
      </div>
    );
  },

});

module.exports = SignUpForm;
