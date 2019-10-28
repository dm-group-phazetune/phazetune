import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { getSession } from "../../redux/reducers/authReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faSearch,
  faPlusCircle,
  faCommentDots,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import AudioUpload from "./AudioUpload";

class FooterNav extends Component {
  constructor() {
    super();
    this.state = {
      upload: false
    };
  }

  componentDidMount() {
    this.props.getSession();
  }

  openAudioUpload = () => {
    this.setState({ upload: true });
  };

  closeAudioUpload = () => {
    this.setState({ upload: false });
  };

  render() {
    return (
      <div>
        {this.props.location.pathname !== "/" ? (
          <div className="FooterNav-container">
            <NavLink
              to="/newsfeed"
              activeStyle={{
                color: "red"
              }}
            >
              <div className="Footernav">
                <FontAwesomeIcon icon={faHome} size="2x" />
              </div>
            </NavLink>
            <NavLink
              to="/explore"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div className="Footernav">
                <FontAwesomeIcon icon={faSearch} size="2x" />
              </div>
            </NavLink>
            <div className="Footernav" onClick={this.openAudioUpload}>
              <FontAwesomeIcon icon={faPlusCircle} size="2x" />
            </div>
            <AudioUpload
              openAudioUpload={this.openAudioUpload}
              closeAudioUpload={this.closeAudioUpload}
              upload={this.state.upload}
            />
            <NavLink
              to="/chat"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div className="Footernav">
                <FontAwesomeIcon icon={faCommentDots} size="2x" />
              </div>
            </NavLink>
            <NavLink
              to="/profile"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <div className="Footernav">
                <FontAwesomeIcon icon={faUserCircle} size="2x" />
              </div>
            </NavLink>
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
