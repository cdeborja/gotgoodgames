var React = require('react');
var Slider = require('react-slick');
var GameIndexItem = require('./indexItem.jsx');

var GameDatabaseSlider = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  showDetail: function (e) {

    this.context.router.push('/games/' + e.target.id);
  },

  render: function () {
    if (this.props.games.length === 0) return (<div>loading</div>);

    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,

    };

    games = this.props.games.map(function (game, idx) {
      return (
        <div key={idx}>
          <ul className="game-preview">
            <img onClick={this.showDetail} id={game.id} src={game.image_url}/>
            <li className="test-background">{game.title}</li>
            <li>Average Rating</li>
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
