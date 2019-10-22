import React, { Component } from "react";
import { getSession, logoutUser } from "../../redux/reducers/authReducer";
import { connect } from "react-redux";

class Header extends Component {
  constructor() {
    super();
    this.state = "";
  }

  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <div>
        <div>PHAZETUNE</div>
        <div>LOGIN</div>
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

export default connect(
  mapStateToProps,
  {
    getSession,
    logoutUser
  }
)(Header);
