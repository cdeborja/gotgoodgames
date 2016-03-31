var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var GameConstants = require('../constants/gameConstants');
var GameStore = new Store(AppDispatcher);

var _games = {};

var resetGames = function (games) {
  _games = {};
  games.forEach(function (game) {
    _games[game.id] = game;
  });
};

var resetGame = function (game) {
  _games[game.id] = game;
};

GameStore.find = function (id) {
  return _games[id];
};

GameStore.all = function () {
  var games = [];
  for (var id in _games) {
    games.push(_games[id]);
  }
  return games;
};

GameStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case GameConstants.GAMES_RECEIVED:
      resetGames(payload.games);
      GameStore.__emitChange();
      break;
    case GameConstants.GAME_RECEIVED:
      resetGame(payload.game);
      GameStore.__emitChange();
      break;
  }
};

module.exports = GameStore;
