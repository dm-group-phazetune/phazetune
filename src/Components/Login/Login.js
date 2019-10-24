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
        <Dialog onClose={this.props.closeLogin} open={this.props.login}>
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogContent>
            <form name="login-form" onSubmit={this.props.handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>username:</label>
                    </td>
                    <td>
                      <input
                        name="username"
                        value={this.props.username}
                        onChange={this.props.handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>password:</label>
                    </td>
                    <td>
                      <input
                        name="password"
                        value={this.props.password}
                        onChange={this.props.handleInput}
                        type="password"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit">LOG IN</button>
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
