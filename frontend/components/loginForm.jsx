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
      <div className="sign-in-box group">
        <h1>Please Log in</h1>

        <form className="input-box" onSubmit={this.handleSubmit}>

          <label className="input-text" htmlFor="username">
            Username
          </label>
          <input className="input-field" onChange={this.updateUsername}
          type="text" value={this.state.username}/>

          <label className="input-text" htmlFor="password">Password</label>
          <input className="input-field" onChange={this.updatePassword}
          type="password" value={this.state.password}/>

          <button className="submit-button">Sign In</button>

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
