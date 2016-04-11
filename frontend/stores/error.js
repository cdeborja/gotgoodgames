var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var ErrorConstants = require('../constants/errorConstants');
var ErrorStore = new Store(AppDispatcher);

var _errors = {};

var resetErrors = function (errors) {
  _errors = {};
  errors.errors.map (function (error, idx) {
    _errors[idx] = error;
  });
};

// var resetError = function (error) {
//   _errors[error.id] = error;
// };
//
// ErrorStore.find = function (id) {
//   return _errors[id];
// };
//
ErrorStore.all = function () {
  var errors = [];
  for (var id in _errors) {
    errors.push(_errors[id]);
  }
  return errors;
};

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ErrorConstants.ERRORS_RECEIVED:
      resetErrors(payload.errors);
      ErrorStore.__emitChange();
      break;
  }
};

module.exports = ErrorStore;
