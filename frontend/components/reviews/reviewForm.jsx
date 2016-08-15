var React = require('react');
var Modal = require('react-modal');
var SessionStore = require('../../stores/session');
var ApiUtil = require('../../util/apiUtil');
var ReviewStore = require('../../stores/review');

var ReviewForm = React.createClass({
  getInitialState: function(){
    return({ modalOpen: false,
             title: "",
             body: "",
             score: null,
             userReview: this.props.userReview,
             alert: false
           });
  },

  handleButtonClick: function () {
    if (this.props.userReview) {
      this.setState({title: this.props.userReview.title,
                     score: null,
                     body:  this.props.userReview.body});
      this.openModal();
    } else {
      this.openModal();
    }
  },

  changeText: function () {
    if (this.props.userReview) {
      this.addEditReviewText();
    }
  },

  addEditReviewText: function () {
    $('.add-review-button').html("Update previous review")
  },

  removeEditReviewText: function () {
    $('.add-review-button').html("Add your own review")
  },

  closeModal: function(){
    this.setState({ modalOpen: false });
  },

  openModal: function(){
    this.setState({ modalOpen: true });
  },

  deleteReview: function (e) {
    e.preventDefault();
    ApiUtil.deletePageReview({
      review: this.props.userReview,
      game_page: true
    });
    this.setState({title: "",
                   score: null,
                   body:  ""});
    this.closeModal();
  },

  handleSubmit: function(e) {
    e.preventDefault();

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
      if (this.props.userReview) {
        var updateParams = {
          review: {
            id: this.props.userReview.id,
            user_id: this.props.userReview.user_id,
            game_id: this.props.userReview.game_id,
            score: this.state.score,
            body: this.state.body,
            title: this.state.title,
            game_page: true
          }
        }

      ApiUtil.updatePageReview(updateParams);
      this.closeModal();

      } else {
        var user_id = SessionStore.currentUser().id;
        var reviewParams = {
          review: {
            user_id: user_id,
            game_id: this.props.game.id,
            score: this.state.score,
            body: this.state.body,
            title: this.state.title
          }
        };
      ApiUtil.createReview(reviewParams);
      this.closeModal();
      }
    }
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
  /*need to figure out how to create  branching path for creating a new review and
  editing a post if the review has already been enter */
  render: function(){

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
    var form = this;
    var reviewHeaderText;

    if (this.props.userReview) {
      reviewHeaderText = <h2>Edit your review</h2>;
      deleteButton = <button onClick={this.deleteReview} className="delete-button">Delete review</button>;
    } else {
      reviewHeaderText = <h2>Create your review</h2>;
      deleteButton = <p></p>;
    }

    return(
      <div>
      <button className="add-review-button" onMouseEnter={this.changeText} onMouseLeave={this.removeEditReviewText} onClick={this.handleButtonClick}>
        Add your own review</button>

      <Modal
        isOpen={this.state.modalOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.closeModal}
        style={reviewFormStyle}>

        <form className="add-review-box">
          {reviewHeaderText}
          <div>
            <label className="review-text">
              Title
            </label>

            <input placeholder="Sum it up!" value={this.state.title} className="add-review-title" onChange={this.updateTitle} type="text">
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
            <textarea className="add-review-textarea" placeholder="Now explain it here!"
            onChange={this.updateReview} value={this.state.body}/>

            <button onClick={this.handleSubmit} className="submit-button">Submit your review</button>
            <span className="review-error-title hidden">Title can't be blank</span>
            <span className="review-error-score hidden">Score can't be blank</span>
            <span className="review-error-body hidden">Body can't be blank</span>
            {deleteButton}
          </div>
        </form>

      </Modal>
      </div>
    );
  }
});

module.exports = ReviewForm;
