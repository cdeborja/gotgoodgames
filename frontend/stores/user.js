var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/userConstants');
var UserStore = new Store(AppDispatcher);
var ReviewConstants = require('../constants/reviewConstants');

var _users = {};

var resetUsers = function (users) {
  _users = {};
  users.forEach(function (user) {
    _users[user.id] = user;
  });
};

var resetUser = function (user) {
  _users[user.id] = user;
};

UserStore.find = function (id) {
  return _users[id];
};

UserStore.all = function () {
  var users = [];
  for (var id in _users) {
    users.push(_users[id]);
  }
  return users;
};

UserStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case UserConstants.USERS_RECEIVED:
      resetUsers(payload.users);
      UserStore.__emitChange();
      break;
    case UserConstants.USER_RECEIVED:
      resetUser(payload.user);
      UserStore.__emitChange();
      break;
  }
};

// case ReviewConstants.USER_REVIEWS_RECEIVED:
// UserStore.__emitChange();
// break;
module.exports = UserStore;
