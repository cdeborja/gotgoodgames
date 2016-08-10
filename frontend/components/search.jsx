var React = require("react");
var SearchResultsStore = require("../stores/searchResults");
var ApiUtil = require('../util/apiUtil');


var Search = React.createClass({
  getInitialState: function () {
    return { query: "",
    results: ""};
  },

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
    if (this.state.query.length > 2) {
      return SearchResultsStore.all().map(function (result, index) {
        if (result._type === "Game") {
          var gamehtml = "#/games/" + result.id;
          return (
            <li key={ index }>
              <a href={ gamehtml } >
                🕹 : { result.title }
              </a>
            </li>
          );

        } else {
          var userhtml = "#/users/" + result.id;
          return (
            <li key={ index }>
              <a href={ userhtml }>
                😀 : { result.username }
              </a>
            </li>
          );
        }
      });
    }
  },
  // FOR SHOWING PAGES
  // <nav className="search-box">
  // Displaying page { meta.page } of { meta.total_pages }
  // <button onClick={ this.nextPage }>NEXT PAGE</button>
  // </nav>
  // onBlur={this.blurSearchField} onFocus={this.focusSearchField}

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
      <form className="search-box group">
        <input type="text" id="search" onChange={ this.handleInputChange }
          placeholder="Search"/>
        <button className="go-button" onClick={ this.search }>GO</button>
        {searchList}
      </form>
    );
  }

});

module.exports = Search;
