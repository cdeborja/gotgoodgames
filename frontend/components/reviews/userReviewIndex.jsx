var React = require('react');
var SessionStore = require('../../stores/session');
var GameStore = require('../../stores/game');
var EditReviewLink = require('./editReviewLink');
var Modal = require('react-modal');
var ApiUtil = require('../../util/apiUtil');

module.exports = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  getInitialState: function () {
    return {
      modalOpen: false,
      score: null,
      body: "",
      title: ""
    };
  },

  deleteReview: function () {
    ApiUtil.deleteReview({
      review: this.props.review,

      });
  },

  handleSubmit: function(e) {
    var user_id = SessionStore.currentUser().id;
    e.preventDefault();
    var reviewParams = {
      review: {
        id: this.props.review.id,
        user_id: user_id,
        score: this.state.score,
        body: this.state.body,
        title: this.state.title
      }
    };
    ApiUtil.updateReview(reviewParams);
    this.closeModal();
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
    this.context.router.push('/games/' + this.props.review.game.id);
  },

  render: function () {
    var review = this.props.review;

    var reviewFormStyle = {
      overlay : {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        backgroundColor : 'rgba(5, 5, 5, 0.75)',
        zIndex         : 10
      },
      content : {
        position        : 'absolute',
        margin          : '0 auto',
        top             : '150px',
        left            : '0px',
        right           : '0px',
        bottom          : '0px',
        border          : '4px solid #555',
        padding         : '20px',
        backgroundColor : '#ddd',
        height          : '380px',
        width           : '650px',
        borderRadius   : '5px',
        zIndex         : 11
      }
    };

    if (review === []) { return (<div></div>); }

    var buttons;

    if (SessionStore.currentUser().id === this.props.review.user_id) {
      buttons = (
          <div className="edit-menu group">
            <button onClick={this.openModal}>EDIT</button>
            <button onClick={this.deleteReview}>DELETE</button>
          </div>
      );
    }

    var form = this;
    var checkedValue = form.props.review.score;
    var scoreChoices = [1, 2, 3, 4, 5].map ( function (value, idx) {
// Need to fix defaulting checked option
      if (checkedValue === value) {
        return (<li key={idx}>
          <label>{value}</label>
          <input type="radio" value={value} className="review-score" name="score"
          onChange={form.updateScore}/>
        </li>);
      } else {
        return (<li key={idx}>
          <label>{value}</label>
          <input type="radio" value={value} className="review-score" name="score"
          onChange={form.updateScore}/>
        </li>);
      }
    });

    return(
      <div>

      <Modal
        isOpen={this.state.modalOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={this.closeModal}
        style={reviewFormStyle}>

        <form className="add-review-box">
          <h2>Edit your review!</h2>
          <label className="input-text">
            Title
          </label>

          <input className="add-review-title" defaultValue={this.props.review.title} onChange={this.updateTitle} type="text">
          </input>
          <label className="input-text" htmlFor="score">
            Score
          </label>

          <ul className="score-choices">
            {scoreChoices}
          </ul>
          <textarea className="add-review-textarea" placeholder="Enter your awesome review here!"
          onChange={this.updateReview} defaultValue={this.props.review.body}/>

          <button onClick={this.handleSubmit} className="submit-button">Submit your updated review</button>

        </form>

      </Modal>

        <ul className="user-reviews group">
          <div onClick={this.goToGame} className="game-review-image group">
            <img src={review.game.image_url} />
            <p>{review.game.title}</p>
          </div>
          <div className="game-review-comment group">
            <h3>{review.title}</h3>
            <p>{review.score}/5</p>
            <span>{review.body}</span>
          </div>
          {buttons}
        </ul>

      </div>
    );
  }

});
