import React, { Component } from "react";
import Axios from "axios";
// import AudioUpload from "../FooterNav/AudioUpload";
import AudioPlayer from "../FooterNav/AudioPlayer";

class Explore extends Component {
  constructor() {
    super();
    this.state = {
      pastPost: [],
      genre: ""
    };
  }
  componentDidMount() {
    // this.genrePost()
    this.fetchPost();
    // this.genreClick()
  }
  updatePastPost = postArr => {
    this.setState({ pastPost: postArr });
  };
  fetchPost = () => {
    Axios.get("/api/users/post").then(response => {
      this.setState({ pastPost: response.data });
    });
  };
  // updateGenrePost = (genreArr) => {
  //   this.setState({genrePost: genreArr})
  // }
  // genrePost = () => {
  //   Axios.get("/api/posts").then(res => {
  //     this.setState({genrePost: res.data})
  //   })
  // }

  genreChange = e => {
    this.setState({ genre: e.target.value });
  };
  genreClick = () => {
    Axios.get(`/api/type?genre=${this.state.genre}`).then(response => {
      this.setState({ pastPost: [...response.data] });
      console.log(response.data);
    });
  };
  render() {
    // console.log(this.state.pastPost);
    return (
      <div className="N-E-container">
        <div className="N-E-top">
          <header className="N-E-title">Explore</header>
          <hr width={200} />
          <nav className="N-E-nav">
            {/* <div className="N-E-nav-links">All</div> */}
          </nav>
          {this.props.user_id !== null ? (
            <div>
              <div>
                <form>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <select
                            className="Btn-secondary-select"
                            onChange={this.genreChange}
                          >
                            <option>Select</option>
                            <option value="Rock">Rock</option>
                            <option value="RB/ Hip-Hop">R&B/ Hip-Hop</option>
                            <option value="Pop">Pop</option>
                            <option value="Country">Country</option>
                            <option value="Dance">Dance/EDM</option>
                            <option value="Christian/Gospel"> Christian/Gospel</option>
                            <option value="Holiday/Seasonal">Holiday/Seasonal</option>
                            <option value="Latin">Latin</option>
                            <option value="Jazz">Jazz</option>
                            <option value="Classical">Classical</option>
                            <option value="Kids Music">Kids Music</option>
                            <option value="Other">Other</option>
                          </select>
                        </td>
                        <td>
                          <button
                            className="Btn-secondary"
                            onClick={this.genreClick}
                          >
                            Choose Genre
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          ) : null}
        </div>

        <main className="N-E-bottom">
          {this.state.pastPost.map((individualPost, i) => {
            return (
              <div className="AudioPlayer" key={i}>
                <AudioPlayer
                  username={individualPost.username}
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

export default Explore;
