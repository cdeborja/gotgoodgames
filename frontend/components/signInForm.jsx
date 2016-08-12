var React = require('react');
var ErrorStore = require('../stores/error');
var ApiUtil = require('../util/apiUtil');

var SignInForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: "",
      password: "",
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var router = this.context.router;
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

  guestLogin: function(e) {
    e.preventDefault();
    var guestParams = {
        username: "guest",
        password: "password"
    };
    var router = this.context.router;

    ApiUtil.login(guestParams, function() {
      router.push("/landingPage");
    });
  },

  goToSignUpForm: function (e) {
    e.preventDefault();
    this.context.router.push("/signup");
  },

  render: function() {

    if (!this.state.currentUser) {
      signUpButton = <button className="sign-in-button" onClick={this.goToSignUpForm}>
      Sign Up</button>;
    }

    var guestButton = <button className="sign-in-button" onClick={this.guestLogin}>
        Guest Login</button>;

    return (
      <div className="sign-in-box group">
        <h1>Sign In</h1>
        <div className="login-error hidden">Incorrect username/password combination</div>

        <form className="input-box">
          <input className="input-field-login" onChange={this.updateUsername}
          type="text" value={this.state.username}/>
          <label className="input-text" htmlFor="username">
          Username
          </label>

          <input className="input-field-login" onChange={this.updatePassword}
          type="password" value={this.state.password}/>
          <label className="input-text" htmlFor="password">Password</label>

          <div className="button-box group">
            <button onClick={this.handleSubmit} className="sign-in-button">Sign In</button>
            {signUpButton}
            {guestButton}
          </div>

        </form>
        <div className="oauth-box group">
          <h2> Sign in with </h2>
          <ul className="oauth-box-buttons">
            <li><a href="/auth/facebook"><i className="fa fa-facebook-square fa-3x facebook" aria-hidden="true"></i></a></li>
            <li><a href="/auth/twitch"><i className="fa fa-twitch fa-3x twitch" aria-hidden="true"></i></a></li>
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = SignInForm;
