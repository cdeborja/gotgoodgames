var React = require('react');
var ApiUtil = require('../util/apiUtil');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var router = this.context.router;
    ApiUtil.login(this.state, function() {
      router.push("/index");
    });
  },

  updateUsername: function(e) {
    this.setState({ username: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  },

  guestLogin: function() {
    var guestParams = {
        username: "guest",
        password: "password"
    };
    var router = this.context.router;
    ApiUtil.login(guestParams, function() {
      router.push("/index");
    });
  },

  render: function() {

    var guestButton = <button className="guest-button" onClick={this.guestLogin}>
        Guest Login</button>;

    return (
      <div className="sign-in-box group">
        <h1>Please Log in</h1>

        <form className="input-box" onSubmit={this.handleSubmit}>

          <label className="input-text" htmlFor="username">
            Username
          </label>
          <input className="input-field-login" onChange={this.updateUsername}
          type="text" value={this.state.username}/>

          <label className="input-text" htmlFor="password">Password</label>
          <input className="input-field-login" onChange={this.updatePassword}
          type="password" value={this.state.password}/>

          <button className="submit-button">Sign In</button>
          {guestButton}
        </form>
      </div>
    );
  }

});

module.exports = LoginForm;
