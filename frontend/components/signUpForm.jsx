var React = require('react');
var ApiUtil = require('../util/apiUtil');

var SignUpForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var router = this.context.router;
    ApiUtil.signUp(this.state);
    ApiUtil.login(this.state, function() {
      router.push("/index");
    });
  },

  updateUsername: function(e) {
    this.setState({ username: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  },

  render: function() {
    return (
      <div className="sign-in-box group">
        <h1>Sign Up</h1>

        <form className="input-box" onSubmit={this.handleSubmit}>

          <label className="input-text" htmlFor="username">
            Username
          </label>
          <input placeholder="How would you like to be known here?"
          className="input-field-login" onChange={this.updateUsername}
          type="text" value={this.state.username}/>

          <label className="input-text" htmlFor="password">Password</label>
          <input className="input-field-login" onChange={this.updatePassword}
          type="password" value={this.state.password}
          placeholder="Is that secret enough???"/>

          <button className="create-new-user-button">Create New User</button>

        </form>
      </div>
    );
  },

});

module.exports = SignUpForm;
