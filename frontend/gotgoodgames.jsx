var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/app');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var ApiUtil = require('./util/apiUtil');
var GamesIndex = require('./components/games/index');
var GameStore = require('./stores/game');
var GameDetail = require('./components/games/detail');
var LoginForm = require('./components/loginForm');
var SessionStore = require('./stores/session');

var routes = (
  <Route path="/" component={App}>
    <Route path="index" component={GamesIndex} onEnter={_requireLoggedIn}/>
    <Route path="games/:gameId" component={GameDetail} onEnter={_requireLoggedIn} >
    </Route>
    <Route path="login" component={LoginForm} />

  </Route>


);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>,
    document.getElementById('root')
  );
});

function _requireLoggedIn(nextState, replace, asyncCompletionCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn);
  } else {
    _redirectIfNotLoggedIn();
  }

  function _redirectIfNotLoggedIn() {
    if (!SessionStore.isLoggedIn()) {
      replace("/login");
    }

    asyncCompletionCallback();
  }
}
