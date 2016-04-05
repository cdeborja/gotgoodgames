var React = require('react');
var Modal = require('react-modal');
var SessionStore = require('../../stores/session');
var ApiUtil = require('../../util/apiUtil');
var ReviewStore = require('../../stores/review');
var ReactSimpleAlert = require('react-simple-alert');

var ReviewForm = React.createClass({
  getInitialState: function(){
    return({ modalOpen: false,
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

  editReview: function (review) {
    this.setState({ modalOpen: true,
                    body: review.body,
                    score: review.score
    });
  },

  closeModal: function(){
    this.setState({ modalOpen: false });
  },

  openModal: function(){
    this.setState({ modalOpen: true });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var user_id = SessionStore.currentUser().id;
    var reviewParams = {
      review: {
        user_id: user_id,
        game_id: this.props.game.id,
        score: this.state.score,
        body: this.state.body,
      }
    };
    ApiUtil.createReview(reviewParams);
    this.closeModal();
  },

  updateScore: function (e) {
    this.setState({ score: e.currentTarget.value});
  },

  updateReview: function (e) {
    this.setState({ body: e.currentTarget.value});
  },
  /*need to figure out how to create  branching path for creating a new review and
  editing a post if the review has already been enter */
  render: function(){
    var rsaOptions = {
        title: "Uh-oh!",
        message: "You're trying to create a new review, but you have already reviewed this game. If you would like to edit your review, please click the edit button",
        alert: this.state.alert,
        confirmButton: {
            text: "Edit Review",
            action: function(review){
              console.log("clicked button");
            }
        }
    };

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
        border          : '1px solid #ccc',
        padding         : '20px',
        backgroundColor : '#eee',
        height          : '320px',
        width           : '650px',
        zIndex         : 11
      }
    };

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
          <label className="input-text" htmlFor="score">
            Score
          </label>

          <ul className="score-choices">
            <li>
            <label>1</label>
            <input type="radio" value="1" className="review-score" name="score"
            onChange={this.updateScore}/>
            </li>
            <li>
            <label>2</label>
            <input type="radio" value="2" className="review-score" name="score"
            onChange={this.updateScore}/>
            </li>
            <li>
            <label>3</label>
            <input type="radio" value="3" className="review-score" name="score"
            onChange={this.updateScore}/>
            </li>
            <li>
            <label>4</label>
            <input type="radio" value="4" className="review-score" name="score"
            onChange={this.updateScore}/>
            </li>
            <li>
            <label>5</label>
            <input type="radio" value="5" className="review-score" name="score"
            onChange={this.updateScore}/>
            </li>
          </ul>
          <textarea className="add-review-textarea" placeholder="Enter your awwwwwsome review here!"
          onChange={this.updateReview} value={this.state.review}/>

          <button onClick={this.handleSubmit} className="submit-button">Submit your review</button>

        </form>

      </Modal>
      </div>
    );
  }
});

module.exports = ReviewForm;
