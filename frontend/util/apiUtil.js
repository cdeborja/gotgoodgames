var AppDispatcher = require('../dispatcher/dispatcher');
var ApiActions = require('../actions/gameActions.js');
var SessionStore = require('../stores/session');
var SessionActions = require('../actions/sessionActions');

module.exports = {
  login: function(credentials, callback) {
    $.ajax({
      type: "POST",
      url: "/api/session",
      dataType: "json",
      data: credentials,
      success: function(currentUser) {
        SessionActions.currentUserReceived(currentUser);
        callback && callback();
      }
    });
  },

  logout: function() {
    $.ajax({
      type: "DELETE",
      url: "/api/session",
      dataType: "json",
      success: function() {
        SessionActions.logout();
      }
    });
  },

  fetchCurrentUser: function(completion) {

    $.ajax({
      type: "GET",
      url: "/api/session",
      dataType: "json",
      success: function(currentUser) {
        SessionActions.currentUserReceived(currentUser);
      },
      complete: function() {
        completion && completion();
      }
    });
  },

  fetchAllGames: function() {
    $.ajax({
      url: "/api/games",
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
      url: "/api/games/" + id,
      success: function (game) {
        ApiActions.receiveSingleGame(game);
      },

      error: function () {
        console.log("Could not retrieve game");
      }
    });
  }

};
