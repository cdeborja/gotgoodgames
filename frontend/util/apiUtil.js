var ApiActions = require('../actions/gameActions.js');

module.exports = {
  fetchAllGames: function() {
    $.ajax({
      url: "api/games",
      success: function (games) {
        ApiActions.receiveAllGames(games);
      },

      error: function () {
        console.log("Could not retrieve games");
      }
    });
  },

  fetchSingleGame: function (id) {
    $.ajax({
      url: "api/games/" + id,
      success: function (game) {
        ApiActions.receiveSingleGame(game);
      },

      error: function () {
        console.log("Could not retrieve game");
      }
    });
  }

};
