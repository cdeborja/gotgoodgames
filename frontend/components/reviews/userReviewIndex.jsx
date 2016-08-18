var React = require('react');
var SessionStore = require('../../stores/session');
var GameStore = require('../../stores/game');
var ReviewStore = require('../../stores/review');
var EditReviewLink = require('./editReviewLink');
var Modal = require('react-modal');
var ApiUtil = require('../../util/apiUtil');

module.exports = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  getInitialState: function () {

    return ({ modalOpen: false,
           title: "",
           body: "",
           score: null
    });
  },

  handleLike: function () {
    var likedUsersIdArr = [];

    for (var i = 0; i < this.props.userReview.liked_users.length; i++) {
      likedUsersIdArr.push(this.props.userReview.liked_users[i].id);
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
        review_id: this.props.userReview.id,
        current_user_page_id: this.props.userReview.user_id
      }
    });
  },

  deleteLike: function (e) {
    this.props.ApiUtil.deleteLike({
      like: {
        id: this.props.userReview.current_user_like_id,
        current_user_page_id: this.props.userReview.user_id
      }
    });
  },

  deleteReview: function (e) {
    e.preventDefault();

    ApiUtil.deleteReview({
      review: this.props.userReview,
    });
  },

  defaultValues: function (e) {
    e.preventDefault();
    var oldTitle = $('.add-review-title')[0].value;
    var oldBody = $('.add-review-textarea')[0].value;
    this.setState({ title: oldTitle,
                        body: oldBody});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var user_id = this.props.userReview.user_id;

    if (this.state.title === "") {
      $(".review-error-title").removeClass("hidden");
      setTimeout(function() {
        $(".review-error-title").addClass("hidden");
      }, 2000);
    } else if (this.state.score === null) {
      $(".review-error-score").removeClass("hidden");
      setTimeout(function() {
        $(".review-error-score").addClass("hidden");
      }, 2000);
    } else if (this.state.body === "") {
      $(".review-error-body").removeClass("hidden");
      setTimeout(function() {
        $(".review-error-body").addClass("hidden");
      }, 2000);
    } else {
      var reviewParams = {

        review: {
          id: this.props.userReview.id,
          user_id: user_id,
          score: this.state.score,
          body: this.state.body,
          title: this.state.title
        }
      };
      ApiUtil.updateReview(reviewParams);
      this.closeModal();
    }
  },

  closeModal: function(){
    this.setState({ modalOpen: false });
  },

  openModal: function(){
    this.setState({ modalOpen: true });
  },

  updateScore: function (e) {
    this.setState({ score: e.currentTarget.value});
  },

  updateReview: function (e) {
    this.setState({ body: e.currentTarget.value});
  },

  updateTitle: function (e) {
    this.setState({ title: e.currentTarget.value});
  },

  goToGame: function () {
    this.context.router.push('/games/' + this.props.userReview.game.id);
  },

  render: function () {
    var review = this.props.userReview;

    var reviewFormStyle = {
      overlay : {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        backgroundColor : 'rgba(0, 0, 0, 0.70)',
        zIndex         : 10
      },
      content : {
        position        : 'absolute',
        margin          : '0 auto',
        top             : '50%',
        transform       : 'translateY(-50%)',
        left            : '0px',
        right           : '0px',
        bottom          : '0px',
        padding         : '0px',
        backgroundColor : '#FFFFFF',
        height          : '58.5%',
        width           : '65%',
        zIndex          : 11
      }
    };

    if (review === []) { return (<div></div>); }


      var likedUsersIdArr = [];
      var likedUsersArr = [];

      for (var i = 0; i < this.props.userReview.liked_users.length; i++) {
        likedUsersIdArr.push(this.props.userReview.liked_users[i].id);
        var username = this.props.userReview.liked_users[i].username;
        likedUsersArr.push(<li key={i}>{username}</li>);
      }

      var likeButton;

      if (likedUsersIdArr.indexOf(this.props.currentUserId) > -1 ) {
        likeButton = <div onClick={this.handleLike}><i className="fa fa-thumbs-up fa-lg thumbs" aria-hidden="true"> <div className="like-font">Unlike</div></i></div>;
      } else {
        likeButton = <div onClick={this.handleLike}><i className="fa fa-thumbs-o-up fa-lg thumbs" aria-hidden="true"> <div className="like-font">Like</div> </i></div>;
      }

      if (this.props.userReview.liked_users.length > 1) {
        likedUsers = <span>{this.props.userReview.liked_users.length} people liked this review</span>;
      } else if (this.props.userReview.liked_users.length === 1) {
        likedUsers = <span>{this.props.userReview.liked_users.length} person liked this review</span>;
      } else {
        likedUsers = <span></span>;
      }

    var buttons, userDiv;

    if (SessionStore.currentUser().id === this.props.userReview.user_id) {
      buttons = (
          <div className="edit-menu group">
            <button className="hidden" onClick={this.openModal}>Edit</button>
            <button className="hidden" onClick={this.deleteReview}>Delete</button>
          </div>
      );
    }

    var form = this;
    var score = review.score + "/5";

    return(
      <div>

      <Modal
        isOpen={this.state.modalOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={this.closeModal}
        style={reviewFormStyle}>

        <form onMouseEnter={form.defaultValues} className="add-review-box">
          <h2>Edit your review</h2>
          <div>
          <label className="review-text">
            Title
          </label>

          <input placeholder="Sum it up!" defaultValue={this.props.userReview.title} className="add-review-title" onChange={this.updateTitle} type="text">
          </input>
          <label className="review-text" htmlFor="score">
            Score
          </label>

          <span className="game-rating">
            <input type="radio" className="rating-input"
              id="rating-input-1-5" name="rating-input-1" value="5" onChange={form.updateScore}/>
            <label htmlFor="rating-input-1-5" className="rating-star"></label>

            <input type="radio" className="rating-input"
              id="rating-input-1-4" name="rating-input-1" value="4" onChange={form.updateScore}/>
            <label htmlFor="rating-input-1-4" className="rating-star"></label>

            <input type="radio" className="rating-input"
              id="rating-input-1-3" name="rating-input-1" value="3" onChange={form.updateScore}/>
            <label htmlFor="rating-input-1-3" className="rating-star"></label>

            <input type="radio" className="rating-input"
              id="rating-input-1-2" name="rating-input-1" value="2" onChange={form.updateScore}/>
            <label htmlFor="rating-input-1-2" className="rating-star"></label>

            <input type="radio" className="rating-input"
              id="rating-input-1-1" name="rating-input-1" value="1" onChange={form.updateScore}/>
            <label htmlFor="rating-input-1-1" className="rating-star"></label>
          </span>
          <label className="review-text">
            Review
          </label>
          <textarea className="add-review-textarea" placeholder="Enter your awesome review here!"
          onChange={this.updateReview} defaultValue={this.props.userReview.body}/>

          <button onClick={this.handleSubmit} className="submit-button">Submit your updated review</button>
          <span className="review-error-title hidden">Title can't be blank</span>
          <span className="review-error-score hidden">Score can't be blank</span>
          <span className="review-error-body hidden">Body can't be blank</span>
          <button onClick={this.deleteReview} className="delete-button">Delete review</button>
          </div>
        </form>

      </Modal>

        <ul className="user-reviews group">
          <div onClick={this.goToGame} className="game-review-image group">
            <img className="comment-img" src={review.game.image_url} />
            <p>{review.game.title}</p>
          </div>
          <div className="game-review-comment group">
            {buttons}
            <h3>{review.title}</h3>
            <p>{score}</p>
            <span>{review.body}</span>
            <div className="like-container">
              {likeButton}
              <div className="liked-users">
                {likedUsers}
                <ul className="liked-users-pop-up ">
                  <div className="arrow-down"></div>
                  {likedUsersArr}
                </ul>
              </div>
            </div>
          </div>
        </ul>

      </div>
    );
  }

});
