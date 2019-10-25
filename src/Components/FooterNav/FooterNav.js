import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getSession } from "../../redux/reducers/authReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faPlusCircle,
  faCommentDots,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";

class FooterNav extends Component {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <div>
        {this.props.location.pathname !== "/" ? (
          <div className="FooterNav-container">
            <Link
              to="/newsfeed"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div className="Footernav">
                <FontAwesomeIcon icon={faHome} size="2x" />
              </div>
            </Link>
            <Link
              to="/explore"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div className="Footernav">
                <FontAwesomeIcon icon={faSearch} size="2x" />
              </div>
            </Link>
            <div className="Footernav">
              <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            </div>
            <Link
              to="/chat"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div className="Footernav">
                <FontAwesomeIcon icon={faCommentDots} size="2x" />
              </div>
            </Link>
            <Link
              to="/profile"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div className="Footernav">
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </div>
            </Link>
          </div>
        ) : null}
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
  )(FooterNav)
);
