var React = require('react');
var ErrorStore = require('../stores/error');
var ApiUtil = require('../util/apiUtil');

var LoginForm = React.createClass({
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

  guestLogin: function() {
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
      signUpButton = <button className="sign-in-button next-to" onClick={this.goToSignUpForm}>
      Sign Up</button>;
    }

    var guestButton = <button className="sign-in-button" onClick={this.guestLogin}>
        Guest Login</button>;

    return (
      <div className="sign-in-box group">
        <h1>Please Sign In</h1>

        <form className="input-box">
          <div className="login-error hidden">Incorrect username/password combination</div>
          <label className="input-text" htmlFor="username">
            Username
          </label>
          <input className="input-field-login" onChange={this.updateUsername}
          type="text" value={this.state.username}/>

          <label className="input-text" htmlFor="password">Password</label>
          <input className="input-field-login" onChange={this.updatePassword}
          type="password" value={this.state.password}/>

          <button onClick={this.handleSubmit} className="sign-in-button next-to">Sign In</button>
          {signUpButton}
          {guestButton}

        </form>
        <div className="oauth-box group">
          <ul>
            <li className="facebook"><div>f</div><a href="/auth/facebook">Login with Facebook</a></li>
          </ul>
        </div>
      </div>
    );
  }

});

// <li className="twitch"><div>t</div><a href="/auth/twitch">Login with Twitch</a></li>
module.exports = LoginForm;
