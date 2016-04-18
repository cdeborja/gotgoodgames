var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/userConstants');

var UserActions = {
  userReceived: function (user) {
    AppDispatcher.dispatch({
      actionType: UserConstants.USER_RECEIVED,
      user: user
    });
  },

  receivedAllReviewedUsers: function (users) {
    AppDispatcher.dispatch({
      actionType: UserConstants.REVIEWED_USERS_RECEIVED,
      users: users
    });
  }

};

module.exports = UserActions;
