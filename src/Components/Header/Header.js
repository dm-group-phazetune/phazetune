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
import logo from "../../images/phazetune-logo.png";

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

  closeLogin = () => {
    this.setState({ login: false });
  };

  closeRegister = () => {
    this.setState({ register: false });
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
              <img src={logo} width={50} alt="phazetune" />
              <div className="Logo">PHAZETUNE</div>
            </div>
            <div className="Login-Register-container">
              <div className="nav" onClick={this.openLogin}>
                LOGIN
              </div>
              <Login
                handleSubmit={this.handleSubmit}
                login={this.state.login}
                username={this.state.username}
                password={this.state.password}
                openLogin={this.openLogin}
                handleInput={this.handleInput}
                closeLogin={this.closeLogin}
              />
              <div className="Pipe">|</div>
              <div className="nav" onClick={this.openRegister}>
                REGISTER
              </div>
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
                closeRegister={this.closeRegister}
              />
            </div>
          </div>
        ) : (
          <div className="Header-container">
            <div className="Logo-container">
              <img src={logo} width={50} alt="phazetune" />
              <div className="Logo">PHAZETUNE</div>
            </div>
            <div className="Login-Register-container">
              <p>Hi, {this.props.first_name}</p>
              <div className="Pipe">|</div>
              <div className="nav" onClick={this.handleLogout}>
                LOG OUT
              </div>
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
