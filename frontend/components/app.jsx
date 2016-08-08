var React = require('react');
var LandingPage = require('./games/landingPage');
var SessionStore = require('../stores/session');
var ApiUtil = require('../util/apiUtil');
var ErrorStore = require('../stores/error');
var Search = require('./search');

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      currentUser: null,
      errors: ErrorStore.all()
    };
  },

  componentDidMount: function() {
    this.sessionStoreToken = SessionStore.addListener(this.handleChange);
    this.errorListener = ErrorStore.addListener(this.handleChange);
    this.handleChange();
  },

  componentWillUnmount: function() {
    this.errorListener.remove();
    this.sessionStoreToken.remove();
  },


  handleChange: function() {
    if (SessionStore.isLoggedIn()) {
      this.setState({ currentUser: SessionStore.currentUser() });
      $(".navigation-links").removeClass("hidden");
      $(".session-links").removeClass("hidden");
    } else {
      this.context.router.push("/login");
    }
  },

  goToIndex: function () {
    this.context.router.push("/landingPage");
  },

  goToCurrentUserHomePage: function () {
    this.context.router.push("/homepage");
  },

  goToGamesIndex: function () {
    this.closeMenu();
    this.context.router.push("/gamesIndex");
  },

  goToUsersIndex: function () {
    this.closeMenu();
    this.context.router.push("/users");
  },

  handleLogout: function () {
    $(".navigation-links").addClass("hidden");
    $(".session-links").addClass("hidden");
    ApiUtil.logout();
  },

  openMenu: function () {
    $(".dropdownUsers").removeClass("hidden");
    $(".dropdownGames").removeClass("hidden");
  },

  closeMenu: function () {
    $(".dropdownUsers").addClass("hidden");
    $(".dropdownGames").addClass("hidden");
  },


  render: function () {
    var home, logoutButton, welcomeMessage, homepage, signUpButton, browse, community, searchBar;

    if (this.state.currentUser) {
      home = <li onClick={this.goToIndex}>Home</li>;
      logoutButton = <li onClick={this.handleLogout}>Logout</li>;
      welcomeMessage = <h2>Welcome, {this.state.currentUser.username}</h2>;
      homepage = <li onClick={this.goToCurrentUserHomePage}>My Stats</li>;
      browse = (<li className="browse group" onMouseLeave={this.closeMenu} onMouseEnter={this.openMenu}>
                  Browse...
                  <ul>
                    <li onClick={this.goToUsersIndex} className="dropdownUsers hidden">Users</li>
                    <li onClick={this.goToGamesIndex} className="dropdownGames hidden">Games</li>
                  </ul>
                </li>);
      searchBar = <Search />;
    }

    if (this.state.errors) {
      errors = this.state.errors;
    }
    return (
      <div>
        <header className="header group">
          <nav className= "navigation-bar">
            <div className="logo-box" onClick={this.goToIndex}>
              <div className="header-logo-first">
                gotgood
              </div>
              <div className="header-logo-second">
                games
              </div>
            </div>
            <div className="navigation-box">
              <ul className="navigation-links">
                {home}
                {homepage}
                {browse}
                {searchBar}
              </ul>
            </div>
            <div className="session-nav">
              <ul className="session-links">
                {welcomeMessage}
                {logoutButton}
              </ul>
            </div>
          </nav>
        </header>
        <body>
          <div className="content"></div>
        </body>
        <div>
          {this.props.children}
        </div>
        <ul className="author-navigation">
          <h3>Created by Christopher De Borja</h3>
          <li><a href="http://www.christopherdeborja.com">Portfolio</a></li>
          <li><a href="http://www.linkedin.com/in/christopherdeborja">LinkedIn</a></li>
          <li><a href="http://www.github.com/cdeborja">Github</a></li>
        </ul>
      </div>
    );
  }


});
