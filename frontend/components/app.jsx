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

  goToIndex: function () {
    this.context.router.push("/index");

  },


  render: function () {
    var button, welcomeMessage;
    if (this.state.currentUser) {
      button = <button className="logout-button" onClick={ApiUtil.logout}>Logout</button>;
      welcomeMessage = <h2>Welcome, {this.state.currentUser.username}</h2>;
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
        <nav className="header-nav group">
        <ul className="header-nav">
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
