var Dispatcher = require('../dispatcher/dispatcher.js');
var GameConstants = require('../constants/gameConstants.js');

module.exports = {
  receiveAllGames: function (games) {
    Dispatcher.dispatch({
      actionType: GameConstants.GAMES_RECEIVED,
      games: games
    });
  },

  receiveSingleGame: function (game) {
    Dispatcher.dispatch({
      actionType: GameConstants.GAME_RECEIVED,
      game: game
    });
  }

};
