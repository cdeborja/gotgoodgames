var Dispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/reviewConstants');

module.exports = {
  receiveUserReviews: function (reviews) {
    Dispatcher.dispatch({
      actionType: ReviewConstants.USER_REVIEWS_RECEIVED,
      reviews: reviews
    });
  }

};
