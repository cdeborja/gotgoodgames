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
      button = <button onClick={ApiUtil.logout}>Logout</button>
      welcomeMessage = <h2>Welcome, {this.state.currentUser.username}</h2>;
    }
    return (
      <div>
      {button}
      {welcomeMessage}
      <h1>Stumblr</h1>
      {this.props.children}
      </div>
    );
  }


});

window.SessionStore =SessionStore;
// render: function () {
//   var button, welcomeMessage;
//
//   if (this.state.currentUser) {
//     button = <button onClick={ApiUtil.logout}>Logout</button>
//     welcomeMessage = <h2>Welcome, {this.state.currentUser.name}</h2>;
//   }
//
//   return (
//     <div>
//     {button}
//     {welcomeMessage}
//     <h1>Stumblr</h1>
//     {this.props.children}
//     </div>
//   );
// },


// Previous return
// return(
//   <div id="game-container">
//   <div className="header-welcome-text">Hey there! Welcome back!</div>
//   {this.props.children}
//   </div>
// );
