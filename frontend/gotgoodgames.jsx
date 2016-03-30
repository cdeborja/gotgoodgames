var React = require('react');
var ReactDOM = require('react-dom');

var App = require('./components/app');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var ApiUtil = require('./util/apiUtil');
var GameStore = require('./stores/game');


var routes = (
  <Route path="/" component={App} />



);

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('homepage')
  );
});

// window.ApiUtil = ApiUtil;
// window.GameStore = GameStore;
