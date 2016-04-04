var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/reviewConstants');
var ReviewStore = new Store(AppDispatcher);

var _reviews = {};

var resetReviews = function (reviews) {
  _reviews = {};
  reviews.forEach(function (review) {
    _reviews[review.id] = review;
  });
};

// var resetGame = function (game) {
//   _reviews[game.id] = game;
// };

// ReviewStore.find = function (id) {
//   return _reviews[id];
// };

ReviewStore.all = function () {
  var reviews = [];
  for (var id in _reviews) {
    reviews.push(_reviews[id]);
  }
  return reviews;
};

ReviewStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ReviewConstants.USER_REVIEWS_RECEIVED:
      resetReviews(payload.reviews);
      ReviewStore.__emitChange();
      break;
  }
};

module.exports = ReviewStore;