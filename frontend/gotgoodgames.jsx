var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

var App = require('./components/app');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var hashHistory = require('react-router').hashHistory;
var ApiUtil = require('./util/apiUtil');

//Current Routes that need pages
var GamesIndex = require('./components/games/index');
var GameDetail = require('./components/games/detail');
var UserHomePage = require('./components/users/homepage');
var LoginForm = require('./components/loginForm');
var SignUpForm = require('./components/signUpForm');

var GameStore = require('./stores/game');
var SessionStore = require('./stores/session');
var UserStore = require('./stores/user');

var routes = (
  <Route path="/" component={App}>
    <Route path="index" component={GamesIndex} onEnter={_requireLoggedIn} />
    <Route path="homepage" component={UserHomePage} onEnter={_requireLoggedIn} />
    <Route path="games/:gameId" component={GameDetail} onEnter={_requireLoggedIn} />
    <Route path="login" component={LoginForm} />
    <Route path="signup" component={SignUpForm} />
  </Route>


);

document.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById('root');
  Modal.setAppElement(container);
  ReactDOM.render(
    <Router history={hashHistory}>{routes}</Router>, container);
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
