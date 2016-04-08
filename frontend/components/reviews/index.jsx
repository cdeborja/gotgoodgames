var React = require('react');

module.exports = React.createClass({

  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  goToUserPage: function (e) {
    this.context.router.push('/users/' + this.props.review.user.id );
  },

  render: function () {
    if (this.props.review === []) { return (<div></div>); }
    return(
      <ul className="user-review group">
        <div onClick={this.goToUserPage} className="game-review-image group">
          <img src="http://img13.deviantart.net/8e36/i/2006/250/1/3/the_last_airbender_avatar_by_jovimia.gif" />
          <p>{this.props.review.user.username}</p>
        </div>
        <div className="game-review-comment group">
          <h3>{this.props.review.title}</h3>
          <p>{this.props.review.score}/5</p>
          <span>{this.props.review.body}</span>
        </div>
      </ul>
    );
  }

});
