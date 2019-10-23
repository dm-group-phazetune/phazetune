import React, { Component } from "react";
// import { connect } from "react-redux";
// import { withRouter } from "react-router-dom";
// import { getSession } from "../../redux/reducers/authReducer";
import AudioUpload from "./AudioUpload";
import AudioPlayer from "./AudioPlayer";

class Newsfeed extends Component {
  // componentDidMount() {
  //   this.props.getSession();
  // }
  render() {
    return (
      <>
        <div>
          <AudioUpload />
          <AudioPlayer />
        </div>
      </>
    );
  }
}

// const mapStateToProps = reduxState => {
//   return {
//     user_id: reduxState.authReducer.user_id
//   };
// };

// export default withRouter(
//   connect(
//     mapStateToProps,
//     { getSession }
//   )(Newsfeed)
// );

export default Newsfeed;
