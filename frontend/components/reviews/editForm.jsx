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
  //ASK ABOUT MOUNT UNMOUNT LEEN
  goToCurrentUserHomePage: function () {
    this.context.router.push("/homepage");
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
    if (!this.state.review) {
      return (<div>LOADING</div>);
    }

    return(
      <div>

        <form className="edit-review-box">
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
