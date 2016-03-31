var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/app');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var ApiUtil = require('./util/apiUtil');
var GamesIndex = require('./components/games/index');
var GameStore = require('./stores/game');
var GameDetail = require('./components/games/detail');

var routes = (
  <Route path="/" component={App}>
    <Route path="/games/:gameId" component={GameDetail} />
  </Route>


);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('homepage')
  );
});
