var React = require('react');
var GamesIndex = require('./games/index');
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


  render: function () {
    var home, logoutButton, welcomeMessage, homepage, signUpButton, browse, community, searchBar;

    if (this.state.currentUser) {
      home = <li onClick={this.goToIndex}>Home</li>;
      logoutButton = <li onClick={ApiUtil.logout}>Logout</li>;
      welcomeMessage = <h2>Welcome, {this.state.currentUser.username}</h2>;
      homepage = <li onClick={this.goToCurrentUserHomePage}>My Stats</li>;
      browse = <li>Browse</li>;
      community = <li>Community</li>;
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
                {community}
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
      </div>
    );
  }


});
