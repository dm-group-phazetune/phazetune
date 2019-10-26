import React, { Component } from "react";
import Axios from "axios";
import AudioUpload from "../FooterNav/AudioUpload";
// import AudioPlayer from "./AudioPlayer";

class Newsfeed extends Component {
  constructor() {
    super();
    this.state = {
      pastPost: []
    };
  }
  componentDidMount() {
    this.fetchPost();
  }
  updatePastPost = postArr => {
    this.setState({ pastPost: postArr });
  };
  fetchPost = () => {
    Axios.get("/api/users/post").then(response => {
      this.setState({ pastPost: response.data });
    });
  };
  render() {
    // console.log(this.state.pastPost);
    return (
      <div className="Newsfeed-container">
        <div className="Audio-container">
          <AudioUpload />
        </div>
        {/* {this.state.pastPost.map(individualPost => {
          console.log(individualPost.audio_url);
          return (
            <>
              <AudioPlayer
                title={individualPost.title}
                genre={individualPost.genre}
                audioUrl={individualPost.audio_url}
              />
            </>
          );
        })} */}
      </div>
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
