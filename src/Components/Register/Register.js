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
        <Dialog open={this.props.register}>
          <DialogTitle>Sign Up</DialogTitle>
          <DialogContent>
            <form name="register-form" onSubmit={this.props.handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label>First Name:</label>
                    </td>
                    <td>
                      <input
                        name="first_name"
                        value={this.props.firstName}
                        onChange={this.props.handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Last Name:</label>
                    </td>
                    <td>
                      <input
                        name="last_name"
                        value={this.props.lastName}
                        onChange={this.props.handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label>Username:</label>
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
                      <label>Password:</label>
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
                  <tr>
                    <td>
                      <label>City:</label>
                    </td>
                    <td>
                      <input
                        name="city"
                        value={this.props.city}
                        onChange={this.props.handleInput}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button type="submit">Register</button>
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
