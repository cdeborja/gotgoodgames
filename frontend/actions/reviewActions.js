var Dispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/reviewConstants');

module.exports = {
  createSingleReview: function (review) {
    Dispatcher.dispatch({
      actionType: ReviewConstants.REVIEW_CREATED,
      review: review
    });
  }

};
