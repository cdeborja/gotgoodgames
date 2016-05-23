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
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 5,
      draggable: false

    };

    games = this.props.games.map(function (game, idx) {
      var color = idx % 2 === 0 ? " blue" : " red";
      return (
        <div key={idx}>
          <ul className="game-preview">
            <img className={color} onClick={this.showDetail} id={game.id} src={game.image_url}/>
            <li>{game.title }</li>
            <li>{game.console}</li>
          </ul>
        </div>
      );
    }.bind(this));

    return (
      <div className="database-slider">
        <h2>Games in the Database</h2>
      <Slider {...settings}>
        {games}
      </Slider>
      </div>
    );
  }
});

module.exports = GameDatabaseSlider;
