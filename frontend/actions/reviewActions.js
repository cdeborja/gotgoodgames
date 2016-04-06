var Dispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/reviewConstants');

module.exports = {
  receiveUserReviews: function (reviews) {
    Dispatcher.dispatch({
      actionType: ReviewConstants.USER_REVIEWS_RECEIVED,
      reviews: reviews
    });
  },

  receiveUserReview: function (review) {
    Dispatcher.dispatch({
      actionType: ReviewConstants.USER_REVIEW_RECEIVED,
      review: review
    });
  },

  reviewUpdated: function (reviews) {
    Dispatcher.dispatch({
      actionType: ReviewConstants.REVIEW_UPDATED,
      reviews: reviews
    });
  },

  userReviewDeleted: function (reviews) {
    Dispatcher.dispatch({
      actionType: ReviewConstants.USER_REVIEW_DELETED,
      reviews: reviews
    });
  }

};
