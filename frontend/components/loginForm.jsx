var React = require('react');
var ApiUtil = require('../util/apiUtil');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },

  render: function() {
    return (
      <div>
        <h1>Please Log in</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username</label>
          <input onChange={this.updateUsername} type="text" value={this.state.username}/>

          <label htmlFor="password">Password</label>
          <input onChange={this.updatePassword} type="password" value={this.state.password}/>

          <button>Submit</button>
        </form>
      </div>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var router = this.context.router;

    ApiUtil.login(this.state, function() {
      router.push("/index");
    });
  },

  updateUsername: function(e) {
    this.setState({ username: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  }

});

module.exports = LoginForm;
