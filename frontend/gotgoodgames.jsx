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
var LandingPage = require('./components/games/landingPage');
var GameDetail = require('./components/games/detail');
var GamesIndex = require('./components/games/gamesIndex');
var UserHomePage = require('./components/users/homepage');
var UserShowPage = require('./components/users/showpage');
var UsersIndex = require('./components/users/usersIndex');
var EditForm = require('./components/reviews/editForm');
var LoginForm = require('./components/loginForm');
var SignUpForm = require('./components/signUpForm');
var Search = require("./components/search");
var EditUserForm = require('./components/users/editUserForm');

var GameStore = require('./stores/game');
var SessionStore = require('./stores/session');
var UserStore = require('./stores/user');

var routes = (
  <Route path="/" component={App}>
    <Route path="homepage" component={UserHomePage} onEnter={_requireLoggedIn} />
    <Route path="edit_user" component={EditUserForm} onEnter={_requireLoggedIn} />
    <Route path="landingPage" component={LandingPage} onEnter={_requireLoggedIn} />
    <Route path="gamesIndex" component={GamesIndex} onEnter={_requireLoggedIn} />
    <Route path="games/:gameId" component={GameDetail} onEnter={_requireLoggedIn} />
    <Route path="reviews/:reviewId" component={EditForm} onEnter={_requireLoggedIn} />
    <Route path="users" component={UsersIndex} onEnter={_requireLoggedIn} />
    <Route path="users/:userId" component={UserShowPage} onEnter={_requireLoggedIn} />
    <Route path="login" component={LoginForm} />
    <Route path="signup" component={SignUpForm} />
    <Route path="search" component={Search} onEnter={_requireLoggedIn}/>
  </Route>


);

document.addEventListener("DOMContentLoaded", function (event) {
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
