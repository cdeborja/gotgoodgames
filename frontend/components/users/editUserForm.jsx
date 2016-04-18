var React = require('react');
var ApiUtil = require('../../util/apiUtil');
var Modal = require('react-modal');
var SessionStore = require('../../stores/session');

//NEED TO REMOVE MODAL CONNECTIVITY

var EditUserForm = React.createClass({
  contextTypes: {
     router: React.PropTypes.object.isRequired
   },

  getInitialState: function () {
    return {
      userId: SessionStore.currentUser().id,
      description: SessionStore.currentUser().description,
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
    ApiUtil.updateUserInformation(this.state.userId, formData);
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
                defaultValue={this.state.description}
                placeholder="Enter a description..."
                onChange={this.handleDescriptionChange}
                value={this.state.description}
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
