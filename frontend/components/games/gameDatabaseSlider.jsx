var React = require('react');
var Slider = require('react-slick');

var GameDatabaseSlider = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  showDetail: function (e) {
    this.context.router.push('/games/' + e.target.id);
  },

  // showRating: function (e) {
  //   id = parseInt(e.currentTarget.id) - 1
  //   $(".rating").removeClass( function(index) {
  //     if (index === id) {
  //       return "hidden"
  //     }
  //   });
  // },
  //
  // hideRating: function (e) {
  //   id = parseInt(e.currentTarget.id) - 1
  //   $(".rating").addClass( function(index) {
  //     if (index === id) {
  //       return "hidden"
  //     }
  //   });
  // },

  render: function () {
    if (this.props.games.length === 0) return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);

    var settings = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 5,
      slidesToScroll: 5,
      draggable: false,
      lazyLoad: true
      // autoplay: true,
      // pauseOnHover: true,
      // autoplaySpeed: 8000
    };

    games = this.props.games.map(function (game, idx) {
      var rating = game.averageRating.toFixed(2);
      // debugger;
      // onMouseEnter={this.showRating} onMouseLeave={this.hideRating}
      return (
        <div key={idx}>
          <ul className="game-preview">
            <li className="test">
              <div className="rating">{rating}</div>
              <img className="slide-cover" onClick={this.showDetail} id={game.id} src={game.image_url}/>
            </li>
            <li>{game.title}</li>
            <li>{game.console}</li>
          </ul>
        </div>
      );
    }.bind(this));

    return (
      <div className="database-slider">
        <h2>Recently Added</h2>
      <Slider {...settings}>
        {games}
      </Slider>
      </div>
    );
  }
});

module.exports = GameDatabaseSlider;
