import React, { Component } from "react";
import Axios from "axios";
// import AudioUpload from "../FooterNav/AudioUpload";
import AudioPlayer from "../FooterNav/AudioPlayer";

class Explore extends Component {
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
      <div className="N-E-container">
        <header className="N-E-title">Explore</header>
        <nav className="N-E-nav">
          <div>All</div>
          <div>Genre</div>
        </nav>
        <main className="N-E-content">
          {this.state.pastPost.map(individualPost => {
            return (
              <div className="AudioPlayer-Container">
                <AudioPlayer
                  title={individualPost.title}
                  genre={individualPost.genre}
                  audioUrl={individualPost.audio_url}
                />
              </div>
            );
          })}
        </main>
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

export default Explore;
