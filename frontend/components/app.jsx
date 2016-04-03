var React = require('react');
var GamesIndex = require('./games/index');
var SessionStore = require('../stores/session');
var ApiUtil = require('../util/apiUtil');

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      currentUser: null
    };
  },

  componentDidMount: function() {
    this.sessionStoreToken = SessionStore.addListener(this.handleChange);
    this.handleChange();
  },

  componentWillUnmount: function() {
    this.sessionStoreToken.remove();
  },


  handleChange: function() {
    if (SessionStore.isLoggedIn()) {
      this.setState({ currentUser: SessionStore.currentUser() });
    } else {
      this.context.router.push("/login");
    }
  },

  goToIndex: function () {
    this.context.router.push("/index");
  },

  goToCurrentUserHomePage: function () {
    this.context.router.push("/homepage");
  },

  goToSignUpForm: function () {
    this.context.router.push("/signup");
  },

  render: function () {
    var button, welcomeMessage, homepage, signUpButton;
    if (this.state.currentUser) {
      button = <button className="logout-button" onClick={ApiUtil.logout}>Logout</button>;
      welcomeMessage = <h2>Welcome, {this.state.currentUser.username}</h2>;
      homepage = <li onClick={this.goToCurrentUserHomePage} className="header-nav-bar">Profile</li>;
    }

    if (!this.state.currentUser) {
      signUpButton = <button className="logout-button" onClick={this.goToSignUpForm}>
      Sign Up</button>;
    }

    return (
      <header className="header group">
        <div onClick={this.goToIndex}>
          <div className="header-logo-first">
            gotgood
          </div>
          <div className="header-logo-second">
            games
          </div>
        </div>
        <ul>
          {homepage}
        </ul>
        <nav className="header-nav group">
        <ul className="header-nav">
          {signUpButton}
          {button}
          {welcomeMessage}
        </ul>
        </nav>
        <div>
          {this.props.children}
        </div>
      </header>
    );
  }


});
