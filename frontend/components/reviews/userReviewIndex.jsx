var React = require('react');
var SessionStore = require('../../stores/session');
var GameStore = require('../../stores/game');
var EditReviewLink = require('./editReviewLink');
var Modal = require('react-modal');
var ApiUtil = require('../../util/apiUtil');



module.exports = React.createClass({
  getInitialState: function () {
    return {
      modalOpen: false,
      score: null,
      body: "",
    };
  },


  deleteReview: function () {
    ApiUtil.deleteReview({review: this.props.review});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var user_id = SessionStore.currentUser().id;
    var reviewParams = {
      review: {
        id: this.props.review.id,
        user_id: user_id,
        score: this.state.score,
        body: this.state.body,
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
        border          : '1px solid #ccc',
        padding         : '20px',
        backgroundColor : '#eee',
        height          : '320px',
        width           : '650px',
        zIndex         : 11
      }
    };


    if (review === []) { return (<div></div>); }
    return(
      <div>
      <button className="submit-button" onClick={this.openModal}>openme</button>

      <Modal
        isOpen={this.state.modalOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={this.closeModal}
        style={reviewFormStyle}>

        <form className="add-review-box">
          <h2>Edit your review!</h2>
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
          onChange={this.updateReview} defaultValue={this.props.review.body}/>

          <button onClick={this.handleSubmit} className="submit-button">Submit your updated review</button>

        </form>

      </Modal>

        <ul className="user-review group">
          <div className="game-review-image group">
            <img src="http://rs306.pbsrc.com/albums/nn262/cuteshiek101/Icons/978287y6kuaab63k.gif~c200" />
            <p>{review.game.title}</p>
          </div>
          <div className="game-review-comment group">
            <h3>Title</h3>
            <p>{review.score}/5</p>
            <span>{review.body}</span>
          </div>
          <div className="edit-menu group">
            <button>EDIT</button>
            <button>DELETE</button>
          </div>
        </ul>

      </div>
    );
  }

});
