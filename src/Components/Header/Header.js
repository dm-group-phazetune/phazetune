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
import Register from "../Register/Register";

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
      city: ""
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
    const { username, password, first_name, last_name, city } = this.state;
    const { loginUser, registerUser } = this.props;

    if (formName === "login-form") {
      loginUser({ username, password });
      this.setState({ login: false, username: "", password: "" });
    } else if (formName === "register-form") {
      registerUser({ username, password, first_name, last_name, city });
      this.setState({
        register: false,
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        city: ""
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
        {this.props.location.pathname === "/" ? (
          <div className="Header-container">
            <div className="Logo-container">
              <div className="Logo">PHAZETUNE</div>
            </div>
            <div className="Login-Register-container">
              <nav onClick={this.openLogin}>LOGIN</nav>
              <Login
                handleSubmit={this.handleSubmit}
                login={this.state.login}
                username={this.state.username}
                password={this.state.password}
                openLogin={this.openLogin}
                handleInput={this.handleInput}
              />
              <div className="Pipe">|</div>
              <nav onClick={this.openRegister}>REGISTER</nav>
              <Register
                handleSubmit={this.handleSubmit}
                register={this.state.register}
                username={this.state.username}
                password={this.state.password}
                firstName={this.state.first_name}
                lastName={this.state.last_name}
                city={this.state.city}
                openRegister={this.openRegister}
                handleInput={this.handleInput}
              />
            </div>
          </div>
        ) : (
          <div className="Header-container">
            <div>PHAZETUNE</div>
            <div>
              <p>Hi, {this.props.first_name}</p>
              <button onClick={this.handleLogout}>LOG OUT</button>
            </div>
          </div>
        )}
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
