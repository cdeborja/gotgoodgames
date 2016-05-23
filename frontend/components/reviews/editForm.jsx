var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var ReviewStore = require('../../stores/review');
var SessionStore = require('../../stores/session');
var ReviewForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getStateFromStore: function () {
    return { review: ReviewStore.find(parseInt(this.props.params.reviewId)),
             body: "",
             score: null,
           };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function() {
    return( this.getStateFromStore());
  },

  componentDidMount: function () {
    this.reviewListener = ReviewStore.addListener(this._onChange);
    var params = {review: {id: this.props.params.reviewId}};
    ApiUtil.fetchUserReview(params);
  },

  componentWillUnmount: function () {
    this.reviewListener.remove();
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var user_id = SessionStore.currentUser().id;
    var reviewParams = {
      review: {
        id: this.state.review.id,
        user_id: user_id,
        game_id: this.state.review.game_id,
        score: this.state.score,
        body: this.state.body,
      }
    };

    ApiUtil.updateReview(reviewParams);
    ApiUtil.fetchUserReviews({review: {user_id: SessionStore.currentUser().id}});
    this.goToCurrentUserHomePage();
  },

  goToCurrentUserHomePage: function () {
    this.context.router.push("/homepage");
  },

  updateScore: function (e) {
    this.setState({ score: e.currentTarget.value});
  },

  updateReview: function (e) {
    this.setState({ body: e.currentTarget.value});
  },

  render: function(){
    if (!this.state.review) {
      return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);
    }

    var form = this;
    var scoreChoices = [1, 2, 3, 4, 5].map ( function (value, idx) {
      return (<li key={idx}>
        <label>{value}</label>
        <input type="radio" value={value} className="review-score" name="score"
        onChange={form.updateScore}/>
      </li>);
      });

    return(
      <div>

        <form className="edit-review-box">
          <h2>Edit your review!</h2>
          <label className="input-text" htmlFor="score">
            Score
          </label>

          <ul className="score-choices">
            {scoreChoices}
          </ul>
          <textarea className="add-review-textarea" placeholder={this.state.review.body}
          onChange={this.updateReview} />

          <button onClick={this.handleSubmit} className="submit-button">Update your review</button>
          <button onClick={this.goToCurrentUserHomePage} className="submit-button">Cancel Update</button>

        </form>

      </div>
    );
  }
});

module.exports = ReviewForm;
