import React, { Component } from "react";
import {
  getSession,
  registerUser,
  loginUser,
  logoutUser
} from "../../redux/reducers/authReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Login from "../Login/Login";

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
      location: ""
    };
  }

  componentDidMount() {
    this.props.getSession();
  }

  openLogin = () => {
    this.setState({ login: true });
  };

  openRegister = () => {
    this.setState({ register: true });
  };

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      this.setState({
        register: false,
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        location: ""
      });
    }
  };

  handleLogout = () => {
    this.props.logoutUser();
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <div>
          {this.props.location.pathname === "/" ? (
            <div>
              <div>PHAZETUNE</div>
              <button onClick={this.openLogin}>LOGIN</button>
              <Login
                handleSubmit={this.handleSubmit}
                login={this.state.login}
                username={this.state.username}
                password={this.state.password}
                openLogin={this.openLogin}
                handleInput={this.handleInput}
              />
              {/* <button name="register" type="button" onClick={this.openRegister}>
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
              </Dialog> */}
            </div>
          ) : (
            <div>
              <div>PHAZETUNE</div>
              <div>
                {/* <p>Hi, {this.props.user_id ? this.props.first_name : Guest}</p> */}
                <button onClick={this.handleLogout}>LOG OUT</button>
              </div>
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
      registerUser,
      loginUser,
      logoutUser
    }
  )(Header)
);
