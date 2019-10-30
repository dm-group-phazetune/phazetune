import React, { Component } from "react";
import { getSession } from "../../redux/reducers/authReducer";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

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
          className="Dialog-container"
        >
          <DialogContent className="Dialog-title">Sign Up</DialogContent>
          <DialogContent className="Dialog-content">
            <form name="register-form" onSubmit={this.props.handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td className="Dialog-label">
                      <label>First Name:</label>
                    </td>
                    <td className="Dialog-input">
                      <input
                        className="input-text"
                        name="first_name"
                        value={this.props.firstName}
                        onChange={this.props.handleInput}
                        autoFocus
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="Dialog-label">
                      <label>Last Name:</label>
                    </td>
                    <td className="Dialog-input">
                      <input
                        className="input-text"
                        name="last_name"
                        value={this.props.lastName}
                        onChange={this.props.handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="Dialog-label">
                      <label>Username:</label>
                    </td>
                    <td className="Dialog-input">
                      <input
                        className="input-text"
                        name="username"
                        value={this.props.username}
                        onChange={this.props.handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="Dialog-label">
                      <label>Password:</label>
                    </td>
                    <td className="Dialog-input">
                      <input
                        className="input-text"
                        name="password"
                        value={this.props.password}
                        onChange={this.props.handleInput}
                        type="password"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="Dialog-label">
                      <label>City:</label>
                    </td>
                    <td className="Dialog-input">
                      <input
                        className="input-text"
                        name="city"
                        value={this.props.city}
                        onChange={this.props.handleInput}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="Dialog-btn-container">
                <button className="Dialog-btn Dialog-btn-style" type="submit">
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
