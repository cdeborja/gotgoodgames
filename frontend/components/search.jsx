var React = require("react");
var SearchResultsStore = require("../stores/searchResults");
var ApiUtil = require('../util/apiUtil');


var Search = React.createClass({

  componentDidMount: function() {
   this.storeListener = SearchResultsStore.addListener(this.handleResultChange);
   this.handleResultChange();
   document.addEventListener("click", this.exitSearch);
 },

  handleResultChange: function () {
    this.forceUpdate();
  },

  exitSearch: function () {
   this.setState({ query: "" });
  },

  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  getInitialState: function () {
    return { query: "",
             results: ""};
  },

  componentWillUnmount: function () {
    this.storeListener.remove();
  },

  _onChange: function () {
    this.setState({results: SearchResultsStore.all()});
  },

  handleInputChange: function (e) {
    var query = e.currentTarget.value;
    this.setState({ query: query }, function () {
      if (query.length > 2) {
        this.search();
      }
    }.bind(this));
  },

  search: function (e) {
    ApiUtil.search(this.state.query, 1);
  },

  nextPage: function () {
    var meta = SearchResultsStore.meta();
    ApiUtil.search(meta.query, meta.page + 1);
  },

  resultList: function () {
    return SearchResultsStore.all().map(function (result) {
      if (result._type === "Game") {
        var gamehtml = "#/games/" + result.id;
        return (
          <li key={ result.id }>
            <a href={gamehtml} >
              Game: { result.title }
            </a>
          </li>
        );

      } else {
        var userhtml = "#/users/" + result.id;
        return (
          <li key={ result.id }>
            <a href={userhtml}>
              User: { result.username }
            </a>
          </li>
        );
      }
    });
  },
  // FOR SHOWING PAGES
  // <nav className="search-box">
  // Displaying page { meta.page } of { meta.total_pages }
  // <button onClick={ this.nextPage }>NEXT PAGE</button>
  // </nav>
  render: function () {
    var searchList;
    if (this.state.query) {
      searchList = (<ul className="search-box-results group">
                { this.resultList() }
              </ul>
            );
    }
    var meta = SearchResultsStore.meta();
    return (
      <form className="search-box">
        <input type="text" id="search" onChange={ this.handleInputChange }
          onBlur={this.blurSearchField} onFocus={this.focusSearchField}
          placeholder="Search here!"/>
        <button onClick={ this.search }>GO</button>
        {searchList}
      </form>
    );
  }

});

module.exports = Search;
