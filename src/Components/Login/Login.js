import React, { Component } from "react";
import { getSession } from "../../redux/reducers/authReducer";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class Login extends Component {
  render() {
    if (this.props.user_id) {
      return <Redirect to="/newsfeed" />;
    }

    return (
      <div>
        <Dialog
          style={{ textAlign: "center" }}
          onClose={this.props.closeLogin}
          open={this.props.login}
        >
          <DialogTitle className="Login-title">Welcome Back</DialogTitle>
          <DialogContent className="Login-content">
            <form name="login-form" onSubmit={this.props.handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td className="login-label">
                      <label>username:</label>
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
                      <label>password:</label>
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
                </tbody>
              </table>
              <div className="Login-btn-container">
                <button className="Login-btn" type="submit">
                  LOG IN
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
  )(Login)
);
