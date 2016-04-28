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
    debugger;
    e.preventDefault();
    var formData = new FormData();
    formData.append("user[description]", this.state.description);
    formData.append("user[picture]", this.state.pictureFile);
    ApiUtil.updateUserInformation(this.props.location.state.user.id, formData);
    this.goToHomePage();
  },

  // <input
  // type="file"
  // onChange={this.handleFileChange}
  // />

  render: function () {

      return(

        <div className="edit-box">
          <form onSubmit={this.handleSubmit}>
            <label>Description
              <textarea
                className="edit-box-description"
                defaultValue={this.props.location.state.user.description}
                placeholder="Enter a description..."
                onChange={this.handleDescriptionChange}
                />
            </label>
            <br/>
            <label>Image
              <input
                type="file"
                onChange={this.handleFileChange}
                />
            </label>
            <br/>
            <input type="submit" value="Save Changes"/>
          </form>
          <p>Preview:</p>
          <img className="preview-image" src={this.state.pictureUrl} />
        </div>
      );
    }
});

module.exports = EditUserForm;
