var React = require('react');
var GamesIndex = require('./games/index');
var SessionStore = require('../stores/session');
var ApiUtil = require('../util/apiUtil');
// var ReviewsIndex = require('./reviews/index');

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


  render: function () {
    var button, welcomeMessage;
    if (this.state.currentUser) {
      button = <button className="logout-button" onClick={ApiUtil.logout}>Logout</button>
      welcomeMessage = <h2>Welcome, {this.state.currentUser.username}</h2>;
    }
    return (
      <header>
        <a href="/#/index">
          <ul>
            <li className="header-logo-first">gotgood</li>
            <li className="header-logo-second">games</li>
          </ul>
        </a>
        <nav className="header-nav group">
        <ul className="header-nav">
        {button}
        {welcomeMessage}
        </ul>
        <div>
        {this.props.children}
        </div>

        </nav>
      </header>
    );
  }


});

window.SessionStore =SessionStore;
