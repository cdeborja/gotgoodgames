var AppDispatcher = require('../dispatcher/dispatcher');
var GameActions = require('../actions/gameActions.js');
var SessionStore = require('../stores/session');
var SessionActions = require('../actions/sessionActions');
var ReviewActions = require('../actions/reviewActions');
var SearchResultActions = require('../actions/searchResultActions');

module.exports = {
  // USER RELATED
  signUp: function(credentials) {
    $.ajax({
      type: "POST",
      url: "api/users",
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
  },

  //search

  search: function (query, page) {
    $.ajax({
      type: "GET",
      url: "/api/searches",
      dataType: "json",
      data: {query: query, page: page},
      success: function (response) {
        SearchResultActions.receiveResults(response);
      },
      error: function () {
        console.log("ApiUtil#search error!");
      }

    });
  }



};
