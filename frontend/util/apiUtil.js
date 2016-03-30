var ApiActions = require('../actions/gameActions.js');

module.exports = {
  fetchAllGames: function() {
    $.ajax({
      url: "api/games",
      success: function (games) {
        ApiActions.receiveAllGames(games);
        console.log(games);
      },

      error: function () {
        console.log("Could not retrieve games");
      }
    });
  }

};
