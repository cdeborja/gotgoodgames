var AppDispatcher = require('../dispatcher/dispatcher');
var GameActions = require('../actions/gameActions.js');
var SessionStore = require('../stores/session');
var SessionActions = require('../actions/sessionActions');
var ReviewActions = require('../actions/reviewActions');
var UserActions = require('../actions/userActions');
var SearchResultActions = require('../actions/searchResultActions');
var ErrorActions = require('../actions/errorActions');

module.exports = {
  signUp: function(credentials) {
    $.ajax({
      type: "POST",
      url: "api/users",
      dataType: "json",
      data: credentials,
      success: function(result) {
        //Need to come back later and figure out how to display the errors instead of having general error
        if ('errors' in result) {
          $(".login-error").removeClass("hidden");
          setTimeout(function(){
            $(".login-error").addClass("hidden");
          }, 3000);
        }
      },
      error: function () {
        console.log("Could not create user");
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
      },
      error: function(request, status, error) {
        $(".login-error").removeClass("hidden");
        setTimeout(function(){
          $(".login-error").addClass("hidden");
        }, 3000);
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

  fetchUser: function (user_id) {
    $.ajax({
      type: "GET",
      url: "/api/users/" + user_id,
      dataType: "json",
      success: function (user) {
        UserActions.userReceived(user);
      },
      error: function () {
        console.log("couldnt get user");
      }
    });
  },

  fetchAllUsers: function () {
    $.ajax({
      type: "GET",
      url: "/api/users/",
      dataType: "json",
      success: function (users) {
        UserActions.usersReceived(users);
      },
      error: function () {
        console.log("Couldn't get all users");
      }
    });
  },

  fetchTopFiveUsers: function() {
    $.ajax({
      type: "GET",
      url: "/api/users/",
      dataType: "json",
      data: {fiveUsers : 5},
      success: function (fiveUsers) {
        UserActions.fiveUsersReceived(fiveUsers);
      },
      error: function () {
        console.log("Loading five users error");
      }
    });
  },

  updateUserInformation: function(user_id, formData, callback) {
    $.ajax({
      url: '/api/users/' + user_id,
      type: 'PUT',
      processData: false,
      contentType: false,
      dataType: 'json',
      data: formData,
      success: function(user) {
        SessionActions.updateUser(user);
        // callback && callback();
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

  fetchAllReviewedUsers: function(game_id) {
    $.ajax({
      type: "GET",
      url: "/api/users",
      dataType: "json",
      data: game_id,
      success: function (users) {
        UserActions.receivedAllReviewedUsers(users);
      },
      error: function() {
        console.log('couldnt fetch all reviewed users');
      }
    });
  },

  fetchUserReviews: function(user_id) {
    $.ajax({
      type: "GET",
      url: "/api/users/"+ user_id + "/reviews",
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

  fetchUserReview: function(params) {
    $.ajax({
      type: "GET",
      url: "/api/reviews/" + params.review.id ,
      dataType: "json",
      data: params,
      success: function (review) {
        ReviewActions.receiveUserReview(review);
      }
    });
  },

  updateReview: function(params) {
    $.ajax({
      type: "PATCH",
      url: "/api/reviews/" + params.review.id ,
      dataType: "json",
      data: params,
      success: function (reviews) {
        ReviewActions.reviewUpdated(reviews);
      },
      error: function() {
        console.log("could not update review");
      }

    });
  },

  deleteReview: function(params) {
    $.ajax({
      type: "DELETE",
      url: "/api/reviews/" + params.review.id,
      dataType: "json",
      data: params,
      success: function (reviews) {
        ReviewActions.userReviewDeleted(reviews);
      },
      error: function () {
        console.log("could not delete review");
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
      type: "GET",
      url: "/api/games/" + id,
      dataType: "json",
      data: id,
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
