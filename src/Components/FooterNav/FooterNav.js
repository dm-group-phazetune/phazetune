import React, { Component } from 'react'
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getSession } from "../../redux/reducers/authReducer";
import { FontAwesomeIcon } from "@fortawesome/fontawesome-svg-core";
import { faHome, faSearch, faPlusCircle, faCommentDots,  } from "@fortawesome/free-solid-svg-icons";

export default class FooterNav extends Component {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <div className="FooterNav-container">
        <div className="Newsfeed-container"></div>
        <div className="Explore-container"></div>
        <div className="AddPost-container"></div>
        <div className="Chat-container"></div>
        <div className="Profile-container"></div>
      </div>
    )
  }
}

const mapStateToProps = reduxState => {
  return {
    user_id: reduxState.authReducer.user_id
  }
}

export default withRouter(connect(mapStateToProps, {
  getSession
})(FooterNav));