var AppDispatcher = require('../dispatcher/dispatcher');
var SearchResultConstants = require('../constants/searchResultConstants');

var SearchResultActions = {
  receiveResults: function (response) {
    var action = {
      actionType: SearchResultConstants.SEARCH_RESULTS_RECEIVED,
      searchResults: response.search_results,
      meta: response.meta
    };
    AppDispatcher.dispatch(action);
  }
};

module.exports = SearchResultActions;
