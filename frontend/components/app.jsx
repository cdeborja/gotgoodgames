var React = require('react');
var LandingPage = require('./games/landingPage');
var SessionStore = require('../stores/session');
var ApiUtil = require('../util/apiUtil');
var Search = require('./search');

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
    this.clearDropdowns();
    this.context.router.push("/homepage");
  },

  goToGamesIndex: function () {
    this.clearDropdowns();
    this.context.router.push("/gamesIndex");
  },

  goToUsersIndex: function () {
    this.clearDropdowns();
    this.context.router.push("/users");
  },

  clearDropdowns: function () {
    $(".browse-links-dropdown").addClass("hidden");
    $('.user-links-dropdown').addClass("hidden");
  },

  handleLogout: function () {
    $(".navigation-links").addClass("hidden");
    $(".session-links").addClass("hidden");
    ApiUtil.logout();
  },

  openMenu: function (e) {
    if (e.currentTarget.className === "browse-links") {
      $(".browse-links-dropdown").removeClass("hidden");
    } else if (e.currentTarget.className === "user-links") {
      $(".user-links-dropdown").removeClass("hidden");
    }
  },

  closeMenu: function (e) {
    if (e.currentTarget.className === "browse-links") {
      $(".browse-links-dropdown").addClass("hidden");
    } else if (e.currentTarget.className === "user-links") {
      $('.user-links-dropdown').addClass("hidden");
    }
  },


  render: function () {
    var home, welcome, browse, userNavigation, searchBar;

    if (this.state.currentUser) {
      welcome = <li>Welcome</li>;
      home = <li className="home" onClick={this.goToIndex}>Home</li>;
      browse = (<li className="browse-links" onMouseLeave={this.closeMenu} onMouseEnter={this.openMenu}>
                  Browse...
                  <ul className="browse-links-dropdown hidden">
                    <div className="arrow-up"></div>
                    <li onClick={this.goToUsersIndex}>Users</li>
                    <li onClick={this.goToGamesIndex}>Games</li>
                  </ul>
                </li>);
      searchBar = <Search />;
      userNavigation = <li className="user-links" onMouseLeave={this.closeMenu} onMouseEnter={this.openMenu}>
                        {this.state.currentUser.username}
                        <ul className="user-links-dropdown hidden">
                          <div className="arrow-up"></div>
                          <li onClick={this.goToCurrentUserHomePage}>My Stats</li>
                          <li onClick={this.handleLogout}>Logout</li>
                        </ul>
                      </li>;
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
                {browse}
              </ul>
            </div>
            <div className="session-nav">
              <ul className="session-links">
                {welcome}
                {userNavigation}
              </ul>
            </div>
            {searchBar}
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
