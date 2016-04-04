var React = require('react');
var Modal = require('react-modal');
var SessionStore = require('../../stores/session');
var ApiUtil = require('../../util/apiUtil');

var ReviewForm = React.createClass({
  getInitialState: function(){
    return({ modalOpen: false,
             body: "",
             score: null});
  },

  closeModal: function(){
    this.setState({ modalOpen: false });
  },

  openModal: function(){
    this.setState({ modalOpen: true });
  },

  handleErrors: function () {

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

  render: function(){
    var reviewFormStyle = {
      overlay : {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        backgroundColor : 'rgba(255, 255, 255, 0.75)',
        zIndex         : 10
      },
      content : {
        position        : 'fixed',
        top             : '100px',
        left            : '150px',
        right           : '150px',
        bottom          : '100px',
        border          : '1px solid #ccc',
        padding         : '20px',
        zIndex         : 11
      }
    };

    return(
      <div>
      <button className="submit-button" onClick={this.openModal}>Add your own review!</button>

      <Modal
        style={reviewFormStyle}
        isOpen={this.state.modalOpen}
        shouldCloseOnOverlayClick={false}
        onRequestClose={this.closeModal}>

        <form className="input-box">

          <label className="input-text" htmlFor="score">
            Score
          </label>

          <ul>
            <li>
            <label>1</label>
            <input className="input-field" type="radio" value="1" name="gameScore"
            onChange={this.updateScore}/>
            </li>
            <li>
            <label>2</label>
            <input className="input-field" type="radio" value="2" name="gameScore"
            onChange={this.updateScore}/>
            </li>
            <li>
            <label>3</label>
            <input className="input-field" type="radio" value="3" name="gameScore"
            onChange={this.updateScore}/>
            </li>
            <li>
            <label>4</label>
            <input className="input-field" type="radio" value="4" name="gameScore"
            onChange={this.updateScore}/>
            </li>
            <li>
            <label>5</label>
            <input className="input-field" type="radio" value="5" name="gameScore"
            onChange={this.updateScore}/>
            </li>
          </ul>

          <label className="input-text" htmlFor="review">Review Box</label>
          <textarea className="input-field-box" placeholder="Enter your awwwwwsome review here!"
          onChange={this.updateReview} value={this.state.review}/>

          <button onClick={this.handleSubmit} className="submit-button">Submit your review</button>

        </form>

      </Modal>
      </div>
    );
  }
});

module.exports = ReviewForm;
