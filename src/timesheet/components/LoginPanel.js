import React from "react";

export default class LoginPanel extends React.Component {
  constructor(props) {
    super(props);

    this.login = props.login;
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  changeUrl(e) {
    this.setState({
      url: e.target.value
    });
  }
  changeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  changePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  changeProject(e) {
    this.setState({
      projects: e.target.value
    });
  }
  changeUser(e) {
    this.setState({
      user: e.target.value
    });
  }
  handleKeyPress(e, f, g) {
    if (e.which === 13) {
      this.login();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.login(
      this.refs.url.value,
      this.refs.username.value,
      this.refs.password.value,
      this.refs.projects.value.split(","),
      this.refs.user.value
    );
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <span className="input-group-addon">
              Jira URL
              <input
                ref ="url"
                type="text"
                defaultValue={"https://jira.caplin.com"}
                className="form-control"
              />
            </span>
          </div>
          <br />
          <div className="input-group">
            <span className="input-group-addon">
              Username
              <input
                ref="username"
                type="text"
                defaultValue={"jonp"}
                className="form-control"
              />
            </span>
          </div>
          <br />
          <div className="input-group">
            <span className="input-group-addon">
              Password
              <input
                ref="password"
                type="password"
                className="form-control"
              />
            </span>
          </div>
          <br />
          <div className="input-group">
            <span className="input-group-addon">
              Projects
              <input
                ref="projects"
                type="text"
                defaultValue={"FXM,MFXMOTIF,FXST,PCTLIBRARY,CT5UP,PTGUI"}
                className="form-control"
              />
            </span>
          </div>
          <br />
          <div className="input-group">
            <span className="input-group-addon">
              User
              <input
                ref="user"
                type="text"
                defaultValue={"jacobm"}
                className="form-control"
              />
            </span>
          </div>
          <div className="panel-body">
            <div className="col-xs-12 col-md-12">
              <button
                type="submit"
                className="btn btn-success btn-block"
              >Login
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}
