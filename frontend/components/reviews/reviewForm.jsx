var React = require('react');
var Modal = require('react-modal');
var SessionStore = require('../../stores/session');
var ApiUtil = require('../../util/apiUtil');
var ReviewStore = require('../../stores/review');
var ReactSimpleAlert = require('react-simple-alert');

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

  _alert: function(){
      this.setState({alert: true});
  },

  checkIfCanReview: function () {
    var reviewedUsers = [];
    var currentUser = SessionStore.currentUser().id;

    this.props.reviews.forEach( function (review) {
      reviewedUsers.push(review.props.review.user_id);
    });

    if (reviewedUsers.includes(currentUser)) {
      this._alert();
    } else {
      this.openModal();
    }
  },

  closeModal: function(){
    this.setState({ modalOpen: false });
  },

  openModal: function(){
    this.setState({ modalOpen: true });
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
    var rsaOptions = {
        title: "Uh-oh!",
        message: "It looks like you're trying to create a new review, but you have already reviewed this game. If you would like to edit your review, please go to My Stats",
        alert: this.state.alert
        // confirmButton: {
        //     text: "Edit Review",
        //     action: function(review){
        //     }
        // }
    };

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
        height          : '55%',
        width           : '65%',
        zIndex          : 11
      }
    };
    var form = this;

    return(
      <div>
      <button className="add-review-button" onClick={this.checkIfCanReview}>
        Add your own review!</button>
        <ReactSimpleAlert options={rsaOptions} />

      <Modal
        isOpen={this.state.modalOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={this.closeModal}
        style={reviewFormStyle}>

        <form className="add-review-box">
          <h2>Create your review!</h2>
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

            <textarea className="add-review-textarea" placeholder="Now explain it here!"
            onChange={this.updateReview} value={this.state.review}/>

            <button onClick={this.handleSubmit} className="submit-button">Submit your review</button>
            <span className="review-error-title hidden">Title can't be blank</span>
            <span className="review-error-score hidden">Score can't be blank</span>
            <span className="review-error-body hidden">Body can't be blank</span>
          </div>
        </form>

      </Modal>
      </div>
    );
  }
});

module.exports = ReviewForm;
