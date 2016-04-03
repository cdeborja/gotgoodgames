var AppDispatcher = require('../dispatcher/dispatcher');
var GameActions = require('../actions/gameActions.js');
var SessionStore = require('../stores/session');
var SessionActions = require('../actions/sessionActions');
var ReviewActions = require('../actions/reviewActions');

module.exports = {
  // USER RELATED
  signUp: function(credentials) {
    $.ajax({
      type: "POST",
      url: "/users",
      dataType: "json",
      data: credentials,
      success: function() {
        console.log("created user!");
      }
    });
  },

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
  createReview: function(reviewParams) {
    $.ajax({
      type: "POST",
      url: "/api/reviews",
      dataType: "json",
      data: reviewParams,
      success: function (game) {
        GameActions.receiveSingleGame(game);
      },
      error: function () {
          console.log("Could not create review");
      }
    });
  },

  fetchUserReviews: function(user_id) {
    $.ajax({
      type: "GET",
      url: "/api/reviews",
      dataType: "json",
      data: user_id,
      success: function (reviews) {
        debugger
        ReviewActions.receiveUserReviews(reviews);
      },
      error: function () {
        console.log("Could not retrieve reviews");
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
