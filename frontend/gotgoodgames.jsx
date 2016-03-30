var React = require('react');
var ReactDOM = require('react-dom');

var Index = require('./components/games/index');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var ApiUtil = require('./util/apiUtil');
var GameStore = require('./stores/game');

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(
    <div><Index /></div>,
    document.getElementById('homepage')
  );
});

window.ApiUtil = ApiUtil;
window.GameStore = GameStore;
