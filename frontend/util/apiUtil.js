var AppDispatcher = require('../dispatcher/dispatcher');
var GameActions = require('../actions/gameActions.js');
var SessionStore = require('../stores/session');
var SessionActions = require('../actions/sessionActions');

module.exports = {
  //USER RELATED
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
  //REVIEW RELATED
  addReview: function(reviewParams) {
    $.ajax({
      type: "GET",
      url: "/api/reviews/new",
      dataType: "json",
      data: reviewParams,
      success: function(currentUserId, reviewId) {
        console.log("got to success");
        ReviewActions.createCurrentReview(currentUserId, reviewId);
      },
      error: function () {
          console.log("Could not create reveiw");
      }
    });
  },


  //GAME RELATED
  fetchAllGames: function() {
    $.ajax({
      url: "/api/games",
      success: function (games) {
        GameActions.receiveAllGames(games);
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
        GameActions.receiveSingleGame(game);
      },

      error: function () {
        console.log("Could not retrieve game");
      }
    });
  }

};
