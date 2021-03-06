var React = require('react');
var LandingPage = require('./games/landingPage');
var SessionStore = require('../stores/session');
var ApiUtil = require('../util/apiUtil');
var Search = require('./search');

// for infinite scrolling
var gamePage = 1;
var reviewsPage = 1;

module.exports = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      currentUser: null
    };
  },

  componentDidMount: function() {
    this.sessionStoreToken = SessionStore.addListener(this.handleChange);
    this.handleChange();
    this.isBottom();
  },

  componentWillUnmount: function() {
    this.sessionStoreToken.remove();
  },


  handleChange: function() {
    if (SessionStore.isLoggedIn()) {
      this.setState({ currentUser: SessionStore.currentUser() });
      $(".navigation-links").removeClass("hidden");
      $(".session-links").removeClass("hidden");
      $(".search-box").removeClass("hidden");

    } else {
      this.context.router.push("/login");
    }
  },

  goToIndex: function () {
    this.context.router.push("/landingPage");
  },

  goToCurrentUserHomePage: function () {
    this.clearDropdowns();
    this.context.router.push("/homepage");
  },

  goToGamesIndex: function () {
    this.clearDropdowns();
    this.context.router.push("/gamesIndex");
  },

  goToUsersIndex: function () {
    this.clearDropdowns();
    this.context.router.push("/usersIndex");
  },

  goToEditProfile: function (e) {
    this.clearDropdowns();
    this.context.router.push({
      pathname: '/edit_user',
      query: {},
      state: { user: this.state.currentUser }
    });
  },

  clearDropdowns: function () {
    $(".browse-links-dropdown").addClass("hidden");
    $('.user-links-dropdown').addClass("hidden");
  },

  handleLogout: function () {
    $(".navigation-links").addClass("hidden");
    $(".session-links").addClass("hidden");
    $(".search-box").addClass("hidden");
    ApiUtil.logout();
  },

  openMenu: function (e) {
    if (e.currentTarget.className === "browse-links") {
      $(".browse-links-dropdown").removeClass("hidden");
    } else if (e.currentTarget.className === "user-links") {
      $(".user-links-dropdown").removeClass("hidden");
    }
  },

  closeMenu: function (e) {
    if (e.currentTarget.className === "browse-links") {
      $(".browse-links-dropdown").addClass("hidden");
    } else if (e.currentTarget.className === "user-links") {
      $('.user-links-dropdown').addClass("hidden");
    }
  },

  //this will handle infinte scrolling for certain pages that require it
  // the "else if" statements allow for resetting of page when changing pages
  isBottom: function () {
    $(window).scroll(function () {
      if($(window).scrollTop() + $(window).height() == $(document).height() && this.location.hash.includes("/gamesIndex")) {
        ApiUtil.fetchAllGames(gamePage + 1);
        gamePage ++;
      } else if ($(window).scrollTop() + $(window).height() == $(document).height() && this.location.hash.includes("/users/")) {
        var start = this.location.hash.indexOf("s/") + 2;
        var end = this.location.hash.indexOf("?");
        var userId = this.location.hash.slice(start,end);
        ApiUtil.fetchUserReviews(userId, reviewsPage + 1);
        reviewsPage ++;
      }

      if (!this.location.hash.includes("/gamesIndex")) {
        gamePage = 1;
      }

      if (!this.location.hash.includes("/users/")) {
        reviewsPage = 1;
      }
    });
  },

  render: function () {
    var home, welcome, browse, userNavigation, searchBar;

    if (this.state.currentUser) {
      welcome = <li>Welcome</li>;
      home = <li className="home" onClick={this.goToIndex}>Home</li>;
      browse = (<li className="browse-links" onMouseLeave={this.closeMenu} onMouseEnter={this.openMenu}>
                  Browse...
                  <div className="arrow-up"></div>
                  <ul className="browse-links-dropdown hidden">
                    <li onClick={this.goToUsersIndex}>Users</li>
                    <li onClick={this.goToGamesIndex}>Games</li>
                  </ul>
                </li>);
      searchBar = <Search />;
      userNavigation = <li className="user-links" onMouseLeave={this.closeMenu} onMouseEnter={this.openMenu}>
                        {this.state.currentUser.username}
                        <div className="arrow-up"></div>
                        <ul className="user-links-dropdown hidden">
                          <li onClick={this.goToCurrentUserHomePage}>My Stats</li>
                          <li onClick={this.goToEditProfile}>Edit Profile</li>
                          <li onClick={this.handleLogout}>Logout</li>
                        </ul>
                      </li>;
    }

    return (
      <div>
        <header className="header group">
          <nav className= "navigation-bar">
            <div className="logo-box" onClick={this.goToIndex}>
              <div className="header-logo-first">
                gotgood
              </div>
              <div className="header-logo-second">
                games
              </div>
            </div>
            <div className="navigation-box">
              <ul className="navigation-links">
                {home}
                {browse}
              </ul>
            </div>
            <div className="session-nav">
              <ul className="session-links">
                {welcome}
                {userNavigation}
              </ul>
            </div>
            {searchBar}
          </nav>
        </header>
        <body>
          <div className="content"></div>
        </body>
        <div>
          {this.props.children}
        </div>
        <ul className="author-navigation">
          <h3>Created by Christopher De Borja</h3>
          <li><a href="http://www.christopherdeborja.com">Portfolio</a></li>
          <li><a href="http://www.linkedin.com/in/christopherdeborja">LinkedIn</a></li>
          <li><a href="http://www.github.com/cdeborja">Github</a></li>
        </ul>
      </div>
    );
  }


});
