var React = require('react');

var IndexItem = React.createClass({

  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  goToUserPage: function (e) {
    this.context.router.push('/users/' + this.props.review.user.id );
  },

  //implement on hover of liked users, opens up new div showing users names
  displayLikedUsers:function (e) {
    likedUsersArr = [];
    for (var i = 0; i < this.props.review.liked_users.length; i++) {
      likedUsersArr.push(this.props.review.liked_users[i].username);
    }
    console.log(likedUsersArr);
  },

  handleLike: function () {
    var likedUsersIdArr = [];

    for (var i = 0; i < this.props.review.liked_users.length; i++) {
      likedUsersIdArr.push(this.props.review.liked_users[i].id);
    }

    if (likedUsersIdArr.indexOf(this.props.currentUserId) > -1 ) {
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

    // update this to a key-value object, id ==> username
    var likedUsersIdArr = [];
    // var likedUsersArr = [];


    for (var i = 0; i < this.props.review.liked_users.length; i++) {
      likedUsersIdArr.push(this.props.review.liked_users[i].id);
      // likedUsersArr.push(this.props.review.liked_users[i].username);
    }

    var likeButton;

    if (likedUsersIdArr.indexOf(this.props.currentUserId) > -1 ) {
      likeButton = <div onClick={this.handleLike}><i className="fa fa-thumbs-up fa-lg thumbs" aria-hidden="true"> <div className="like-font">Unlike</div></i></div>;
    } else {
      likeButton = <div onClick={this.handleLike}><i className="fa fa-thumbs-o-up fa-lg thumbs" aria-hidden="true"> <div className="like-font">Like</div> </i></div>;
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
          <div className="like-container">
            {likeButton}
            {likedUsers}
          </div>
        </div>
      </ul>
    );
  }

});

module.exports = IndexItem;
