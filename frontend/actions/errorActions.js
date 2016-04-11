var Dispatcher = require('../dispatcher/dispatcher');
var ErrorConstants = require('../constants/errorConstants');

module.exports = {
  errorsReceived: function (errors) {
    Dispatcher.dispatch({
      actionType: ErrorConstants.ERRORS_RECEIVED,
      errors: errors
    });
  }
};
