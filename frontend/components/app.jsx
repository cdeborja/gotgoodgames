var React = require('react');
var GamesIndex = require('./games/index');
var SessionStore = require('../stores/session');
var ApiUtil = require('../util/apiUtil');
// var Search = require("./search");

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


  render: function () {
    var button, welcomeMessage, homepage, signUpButton;
    
    if (this.state.currentUser) {
      button = <li onClick={ApiUtil.logout}>Logout</li>;
      welcomeMessage = <h2>Welcome, {this.state.currentUser.username}</h2>;
      homepage = <li onClick={this.goToCurrentUserHomePage}>My Stats</li>;
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
                <li onClick={this.goToIndex}>Home</li>
                {homepage}
                <li>Browse</li>
                <li>Community</li>
                <input className="search-box" type="text" />
              </ul>
            </div>
            <div className="session-nav">
              <ul className="session-links">

                {welcomeMessage}
                {button}
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
