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
          <img className="comment-img" src={this.props.review.user.picture} />
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
