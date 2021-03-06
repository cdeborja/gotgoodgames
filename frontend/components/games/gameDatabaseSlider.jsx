var React = require('react');
var Slider = require('react-slick');

var GameDatabaseSlider = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  showDetail: function (e) {
    this.context.router.push('/games/' + e.target.id);
  },

  render: function () {
    if (this.props.games.length === 0) return (<img className="loading-image" src="https://www.criminalwatchdog.com/images/assets/loading.gif"/>);

    var settings = {
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 5,
      slidesToScroll: 5,
      draggable: false
    };

    games = this.props.games.map(function (game, idx) {
      var rating = game.averageRating.toFixed(2);

      return (
        <div key={idx}>
          <ul className="slider-game-preview">
            <li className="rating-overlay">
              <div className="rating">{rating}</div>
              <div className="rating-text">average score</div>
              <img className="slide-cover" onClick={this.showDetail} id={game.id} src={game.image_url}/>
            </li>
            <li>{game.title}</li>
            <li>{game.console}</li>
          </ul>
        </div>
      );
    }.bind(this));

    return (
      <div className="game-slider">
        <h2>Recently Added</h2>
      <Slider {...settings}>
        {games}
      </Slider>
      </div>
    );
  }
});

module.exports = GameDatabaseSlider;
