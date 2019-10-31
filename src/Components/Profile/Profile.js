import React, { Component } from "react";
import { connect } from "react-redux";
import {
  editProfile,
  getProfile,
  resetAction
} from "../../redux/reducers/profReducer";
import { editPost, deletePost } from "../../redux/reducers/postsReducer";
import { getSession } from "../../redux/reducers/authReducer";
import AudioPlayer from "../FooterNav/AudioPlayer";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      genre: "",
      photo: "",
      bio: "",
      city: "",
      first_name: "",
      last_name: "",
      editPost: false,
      editProfile: false
    };
  }

  async componentDidMount() {
    await this.props.getProfile(this.props.match.params.username);
    const { first_name, last_name, photo, city, bio } = this.props;
    if (
      this.props.user_id ||
      this.props.match.params.username === this.props.username
    ) {
      this.setState({
        first_name: first_name,
        last_name: last_name,
        photo: photo,
        city: city,
        bio: bio
      });
    }
  }

  checkUploadResult = (error, resultEvent) => {
    if (resultEvent.event === "success") {
      this.setState({ photo: resultEvent.info.url });
    }
  };
  openEditPost = () => {
    this.setState({ editPost: true });
  };

  openEditProfile = () => {
    this.setState({ editProfile: true });
  };

  closeEditPost = () => {
    this.setState({ editPost: false });
  };

  closeEditProfile = () => {
    this.setState({ editProfile: false });
  };
  handleEditPost = (e, post_id) => {
    e.preventDefault();
    const { title, genre } = this.state;
    const updatedPost = {
      title,
      genre
    };
    this.props.editPost(post_id, updatedPost);
  };

  handlePlaceChange = event => {
    this.setState({ genre: event.target.value });
  };

  handleDeletePost = post_id => {
    this.props.deletePost(post_id);
    this.props.getProfile(this.props.match.params.username);
  };
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleEditProfile = () => {
    const { first_name, last_name, photo, bio, city } = this.state;
    const editedProfile = { first_name, last_name, photo, bio, city };
    this.props.editProfile(editedProfile);
    alert("You've changed your profile settings.");
    this.setState({ editProfile: false });
    this.props.getProfile(this.props.match.params.username);
  };

  componentDidUpdate(prevProps) {
    if (this.props.user_id !== prevProps.user_id) {
      this.props.getProfile(this.props.match.params.username);
      const { first_name, last_name, photo, city, bio } = this.props;
      if (
        this.props.user_id ||
        this.props.match.params.username === this.props.username
      ) {
        this.setState({
          first_name: first_name,
          last_name: last_name,
          photo: photo,
          city: city,
          bio: bio
        });
      }
    }
  }

  async componentWillUnmount() {
    await this.props.resetAction();
  }

  render() {
    // cloudinary widget
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "phazetune",
        uploadPreset: "vaawqi0h",
        sources: ["local", "url", "dropbox", "facebook", "instagram"],
        cropping: true,
        cropping_aspect_ratio: 1
      },
      (error, result) => {
        this.checkUploadResult(error, result);
      }
    );

    const { user } = this.props;
    const mappedPosts =
      this.props.user && this.props.user[1]
        ? user[1].map((track, i) => {
            return (
              <div className="AudioPlayer-Container" key={i}>
                <div>
                  <AudioPlayer
                    title={track.title}
                    genre={track.genre}
                    audioUrl={track.audio_url}
                  />
                  {/* IF USER ON SESSION SHOW EDIT/DELETE ON TRACK */}
                  {this.props.user_id === track.user_id &&
                  this.props.user_id &&
                  this.props.match.params.username === this.props.username ? (
                    <div>
                      <button onClick={() => this.openEditPost()}>EDIT</button>
                      <button
                        onClick={() => {
                          this.handleDeletePost(track.post_id);
                        }}
                      >
                        DELETE
                      </button>
                      <Dialog
                        style={{ textAlign: "center" }}
                        className="Dialog-container"
                        onClose={this.closeEditPost}
                        open={this.state.editPost}
                      >
                        <DialogContent className="Dialog-title">
                          Edit Track
                        </DialogContent>
                        <DialogContent className="Dialog-content">
                          <form>
                            <table>
                              <tbody>
                                <tr>
                                  <td className="Dialog-label">
                                    <label>Title:</label>
                                  </td>
                                  <td className="Dialog-input">
                                    <input
                                      className="input-text"
                                      onChange={e =>
                                        this.setState({
                                          title: e.target.value
                                        })
                                      }
                                      autoFocus
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="Dialog-label">
                                    <label>Genre:</label>
                                  </td>
                                  <td className="Dialog-input">
                                    <select
                                      name="genre"
                                      className="input-select"
                                      onChange={this.handlePlaceChange}
                                    >
                                      <option>Select</option>
                                      <option>Rock</option>
                                      <option>R&B/ Hip-Hop</option>
                                      <option>Pop</option>
                                      <option>Country</option>
                                      <option>Dance/EDM</option>
                                      <option>Christian/Gospel</option>
                                      <option>Holiday/Seasonal</option>
                                      <option>Latin</option>
                                      <option>Jazz</option>
                                      <option>Classical</option>
                                      <option>Kids Music</option>
                                      <option>Other</option>
                                    </select>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </form>
                          <div className="Dialog-btn-container">
                            <button
                              className="Dialog-btn Dialog-btn-style"
                              onClick={e => {
                                this.handleEditPost(e, track.post_id);
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })
        : this.props.user;

    return (
      <div className="Profile-container">
        <div className="Profile-body">
          <div>
            <header className="Profile-top">
              <div className="Profile-left">
                {this.props.user &&
                this.props.user[0] &&
                this.props.user[0][0].photo !== "" ? (
                  <>
                    <img
                      src={this.props.user[0][0].photo}
                      alt={`${this.props.match.params.username}'s profile avatar`}
                      className="Profile-image"
                    />
                  </>
                ) : (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    color="#ffffff"
                    size="10x"
                    className="User-avatar"
                  />
                )}
                {this.props.user_id &&
                this.props.match.params.username === this.props.username ? (
                  <div>
                    <button
                      className="Dialog-btn-p Dialog-btn-style"
                      onClick={this.openEditProfile}
                    >
                      EDIT PROFILE
                    </button>
                    <Dialog
                      style={{ textAlign: "center" }}
                      className="Dialog-container"
                      onClose={this.closeEditProfile}
                      open={this.state.editProfile}
                    >
                      <DialogContent className="Dialog-title">
                        Edit Profile
                      </DialogContent>
                      <DialogContent className="Dialog-content">
                        <table>
                          <tbody>
                            <tr>
                              <td className="Dialog-label">
                                <label>First Name:</label>
                              </td>
                              <td className="Dialog-input">
                                <input
                                  name="first_name"
                                  className="input-text"
                                  onChange={this.handleInput}
                                  value={this.state.first_name}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="Dialog-label">
                                <label>Last Name:</label>
                              </td>
                              <td className="Dialog-input">
                                <input
                                  name="last_name"
                                  className="input-text"
                                  onChange={this.handleInput}
                                  value={this.state.last_name}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="Dialog-label">
                                <label>City:</label>
                              </td>
                              <td className="Dialog-input">
                                <input
                                  name="city"
                                  className="input-text"
                                  onChange={this.handleInput}
                                  value={this.state.city}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="Dialog-label">
                                <label>Bio:</label>
                              </td>
                              <td className="Dialog-input">
                                <textarea
                                  name="bio"
                                  rows="4"
                                  className="input-textarea"
                                  onChange={this.handleInput}
                                  value={this.state.bio}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="Dialog-label">
                                <label>Photo:</label>
                              </td>
                              <td className="Dialog-input">
                                <button
                                  className="Input-file"
                                  onClick={() => widget.open()}
                                >
                                  Upload
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <button
                          className="Dialog-btn Dialog-btn-style"
                          onClick={() => this.handleEditProfile()}
                        >
                          Save
                        </button>
                      </DialogContent>
                    </Dialog>
                  </div>
                ) : null}
              </div>
              {this.props.user && this.props.user[0] ? (
                <div className="Profile-right">
                  <div className="Profile-username">
                    {this.props.user[0][0].username}
                  </div>
                  <div className="Profile-city">
                    {this.props.user[0][0].city}
                  </div>
                  <div className="Profile-bio">{this.props.user[0][0].bio}</div>
                  {/* <div>
                    {this.props.user && this.props.user[0][0].follow_count}
                  </div> */}
                </div>
              ) : null}
            </header>
            <hr className="Divider" width={600} />
          </div>

          <main className="Profile-bottom">
            <header className="Profile-tracks">Tracks</header>
            <body className="Profile-tracks-body">{mappedPosts}</body>
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.profReducer.user,
    user_id: reduxState.authReducer.user_id,
    username: reduxState.authReducer.username,
    first_name: reduxState.authReducer.first_name,
    last_name: reduxState.authReducer.last_name,
    city: reduxState.authReducer.city,
    photo: reduxState.authReducer.photo,
    bio: reduxState.authReducer.bio
  };
};

export default connect(
  mapStateToProps,
  { editProfile, getProfile, editPost, deletePost, getSession, resetAction }
)(Profile);
