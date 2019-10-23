import React, { Component } from "react";
import {
  getSession,
  loginUser,
  registerUser,
  logoutUser
} from "../../redux/reducers/authReducer";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      login: false,
      register: false,
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      location: "",
      toNewsfeed: false
    };
  }

  componentDidMount() {
    this.props.getSession();
  }
  handleLogout = e => {
    this.props.logoutUser();
    this.props.history.push("/");
  };

  openLogin = () => {
    this.setState({ login: true });
  };

  openRegister = () => {
    this.setState({ register: true });
  };

  handleSubmit = e => {
    e.preventDefault();
    const formName = e.target.name;
    const { username, password, first_name, last_name, location } = this.state;
    const { loginUser, registerUser } = this.props;

    if (formName === "login-form") {
      loginUser({ username, password });
      this.setState({ login: false, username: "", password: "" });
    } else if (formName === "register-form") {
      registerUser({ username, password, first_name, last_name, location });
      this.setState({ register: false });
    }
  };

  // handleLogin = e => {
  //   e.preventDefault();
  //   const { username, password } = this.state;
  //   const { loginUser } = this.props;
  //   loginUser({ username, password });
  //   this.setState({ login: false });
  //   this.props.history.push("/newsfeed");
  // };

  // handleRegister = e => {
  //   e.preventDefault();
  //   const { username, password, first_name, last_name, location } = this.state;
  //   const { registerUser } = this.props;
  //   registerUser({ username, password, first_name, last_name, location });
  //   this.setState({ register: false });
  //   this.props.history.push("/newsfeed");
  // };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <div>
          {this.props.location.pathname === "/" ? (
            <div>
              <div>PHAZETUNE</div>
              <button onClick={this.openLogin}>LOGIN</button>
              <Dialog open={this.state.login}>
                <DialogTitle>Welcome Back</DialogTitle>
                <DialogContent>
                  <form name="login-form" onSubmit={this.handleSubmit}>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <label>username:</label>
                          </td>
                          <td>
                            <input
                              name="username"
                              value={this.state.username}
                              onChange={this.handleInput}
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
                              value={this.state.password}
                              onChange={this.handleInput}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button type="submit">LOG IN</button>
                  </form>
                </DialogContent>
              </Dialog>
              <button name="register" type="button" onClick={this.openRegister}>
                REGISTER
              </button>
              <Dialog open={this.state.register}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                  <form name="register-form" onSubmit={this.handleSubmit}>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <label>First Name:</label>
                          </td>
                          <td>
                            <input placeholder="" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Last Name:</label>
                          </td>
                          <td>
                            <input placeholder="" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Username:</label>
                          </td>
                          <td>
                            <input placeholder="" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Password:</label>
                          </td>
                          <td>
                            <input placeholder="" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>Location:</label>
                          </td>
                          <td>
                            <input placeholder="" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button type="submit">Register</button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div>
              <div>PHAZETUNE</div>
              <button onClick={this.handleLogout}>LOG OUT</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user_id: reduxState.authReducer.user_id,
    first_name: reduxState.authReducer.first_name
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      getSession,
      loginUser,
      registerUser,
      logoutUser
    }
  )(Header)
);
