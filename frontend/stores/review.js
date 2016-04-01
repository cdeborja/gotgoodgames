var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ReviewConstants = require('../constants/reviewConstants');
var ReviewStore = new Store(AppDispatcher);

var _reviews = {};

// var resetGames = function (games) {
//   _games = {};
//   games.forEach(function (game) {
//     _games[game.id] = game;
//   });
// };
//
// var resetGame = function (game) {
//   _games[game.id] = game;
// };
//
// ReviewStore.find = function (id) {
//   return _games[id];
// };
//
// ReviewStore.all = function () {
//   var games = [];
//   for (var id in _games) {
//     games.push(_games[id]);
//   }
//   return games;
// };

ReviewStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ReviewConstants.REVIEW_CREATED:
      // resetReview(payload.games);
      ReviewStore.__emitChange();
      break;
  }
};

module.exports = ReviewStore;
