import React, { Component } from "react";
import { getSession } from "../../redux/reducers/authReducer";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class Register extends Component {
  render() {
    if (this.props.user_id) {
      return <Redirect to="/newsfeed" />;
    }
    return (
      <div>
        <Dialog
          style={{ textAlign: "center" }}
          onClose={this.props.closeRegister}
          open={this.props.register}
          className="Login-container"
        >
          <DialogTitle className="Login-title">Sign Up</DialogTitle>
          <DialogContent className="Login-content">
            <form name="register-form" onSubmit={this.props.handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td className="login-label">
                      <label>First Name:</label>
                    </td>
                    <td className="login-input">
                      <input
                        className="input"
                        name="first_name"
                        value={this.props.firstName}
                        onChange={this.props.handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="login-label">
                      <label>Last Name:</label>
                    </td>
                    <td className="login-input">
                      <input
                        className="input"
                        name="last_name"
                        value={this.props.lastName}
                        onChange={this.props.handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="login-label">
                      <label>Username:</label>
                    </td>
                    <td className="login-input">
                      <input
                        className="input"
                        name="username"
                        value={this.props.username}
                        onChange={this.props.handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="login-label">
                      <label>Password:</label>
                    </td>
                    <td className="login-input">
                      <input
                        className="input"
                        name="password"
                        value={this.props.password}
                        onChange={this.props.handleInput}
                        type="password"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="login-label">
                      <label>City:</label>
                    </td>
                    <td className="login-input">
                      <input
                        className="input"
                        name="city"
                        value={this.props.city}
                        onChange={this.props.handleInput}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="Login-btn-container">
                <button className="Login-btn" type="submit">
                  Register
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    user_id: reduxState.authReducer.user_id
  };
};
export default withRouter(
  connect(
    mapStateToProps,
    {
      getSession
    }
  )(Register)
);
