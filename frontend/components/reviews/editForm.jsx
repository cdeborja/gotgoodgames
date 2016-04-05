var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var ReviewStore = require('../../stores/review');

var ReviewForm = React.createClass({

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

    console.log("handlesubmit");
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
          onChange={this.updateReview} value={this.state.review.body} defaultValue="Hello"/>

          <button onClick={this.handleSubmit} className="submit-button">Submit your review</button>

        </form>

      </div>
    );
  }
});

module.exports = ReviewForm;
