var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var Modal = require('react-modal');
var SessionStore = require('../../stores/session');

var EditUserForm = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  getInitialState: function () {
    return {
      description: this.props.location.state.user.description,
      pictureFile: null,
      pictureUrl: null
    };
  },

  componentDidMount: function () {
    this.sessionListener = SessionStore.addListener(this._onChange);
  },

  componentWillUnmount: function () {
    this.sessionListener.remove();
  },


  goToHomePage: function () {
    this.context.router.push('/homepage');
  },

  handleDescriptionChange: function (e) {
    this.setState({ description: e.currentTarget.value });
  },

  handleFileChange: function (e) {
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      var result = reader.result;
      this.setState({ pictureFile: file, pictureUrl: result });
    }.bind(this);

    reader.readAsDataURL(file);
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("user[description]", this.state.description);
    formData.append("user[picture]", this.state.pictureFile);
    ApiUtil.updateUserInformation(this.props.location.state.user.id, formData);
    this.goToHomePage();
  },
  render: function () {

      return(

        <div className="edit-box group">
          <div className="edit-box-picture">
            <h2>Profile Picture</h2>

            <input
            type="file"
            onChange={this.handleFileChange}
            />

            <p>Preview:</p>
            <img className="preview-image" src={this.state.pictureUrl} />
          </div>

          <div className="edit-box-information" onSubmit={this.handleSubmit}>
            <h2>About</h2>
              <textarea
                className="edit-box-description"
                defaultValue={this.props.location.state.user.description}
                placeholder="Enter a description..."
                onChange={this.handleDescriptionChange}
                />
            <button onClick={this.handleSubmit}>Save Changes</button>
          </div>
        </div>
      );
    }
});

module.exports = EditUserForm;
