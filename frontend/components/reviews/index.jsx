var React = require('react');

var IndexItem = React.createClass({

  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  goToUserPage: function (e) {
    this.context.router.push('/users/' + this.props.review.user.id );
  },

  displayLikedUsers:function (e) {
    console.log(this.props.review.liked_users);
  },

  handleLike: function () {
    var likedUsersArr = [];

    for (var i = 0; i < this.props.review.liked_users.length; i++) {
      likedUsersArr.push(this.props.review.liked_users[i].id);
    }

    if (likedUsersArr.indexOf(this.props.currentUserId) > -1 ) {
      this.deleteLike();
    } else {
      this.addLike();
    }
  },

  addLike: function (e) {
    this.props.ApiUtil.createLike({
      like: {
        user_id: this.props.currentUserId,
        review_id: this.props.review.id,
        game_id: this.props.review.game_id
      }
    });
  },

  deleteLike: function (e) {
    this.props.ApiUtil.deleteLike({
      like: {
        id: this.props.review.current_user_like_id,
        game_id: this.props.review.game_id
      }
    });
  },

  render: function () {
    if (this.props.review === []) { return (<div></div>); }

    var likedUsersArr = [];

    for (var i = 0; i < this.props.review.liked_users.length; i++) {
      likedUsersArr.push(this.props.review.liked_users[i].id);
    }

    var likeButton;

    if (likedUsersArr.indexOf(this.props.currentUserId) > -1 ) {
      likeButton = <i className="fa fa-thumbs-up fa-lg thumbs" aria-hidden="true"></i>;
    } else {
      likeButton = <i className="fa fa-thumbs-o-up fa-lg thumbs" aria-hidden="true"></i>;
    }

    if (this.props.review.liked_users.length > 1) {
      likedUsers = <div onMouseOver={this.displayLikedUsers}>{this.props.review.liked_users.length} people liked this review</div>;
    } else if (this.props.review.liked_users.length === 1) {
      likedUsers = <div onMouseOver={this.displayLikedUsers}>{this.props.review.liked_users.length} person liked this review</div>;
    } else {
      likedUsers = <div onMouseOver={this.displayLikedUsers}></div>;
    }

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
        <div onClick={this.handleLike}>
          {likeButton}
        </div>
        {likedUsers}
      </ul>
    );
  }

});

module.exports = IndexItem;
