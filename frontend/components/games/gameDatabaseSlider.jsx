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
      draggable: false,
      lazyLoad: true,
      autoplay: true,
      pauseOnHover: true,
      autoplaySpeed: 8000
    };

    games = this.props.games.map(function (game, idx) {
      return (
        <div key={idx}>
          <ul className="game-preview">
            <img className="blue" onClick={this.showDetail} id={game.id} src={game.image_url}/>
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
