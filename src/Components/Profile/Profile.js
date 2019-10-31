import React, { Component } from "react";
import { connect } from "react-redux";
import { editProfile, getProfile } from "../../redux/reducers/profReducer";
import { editPost, deletePost } from "../../redux/reducers/postsReducer";
import { getSession } from "../../redux/reducers/authReducer";
import {followUser} from '../../redux/reducers/followReducer';
import AudioPlayer from "../FooterNav/AudioPlayer";

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
      last_name: ""
    };
  }

  componentDidMount() {
    this.props.getProfile(this.props.match.params.username);
    const { first_name, last_name, photo, city, bio } = this.props;
    this.setState({
      first_name: first_name,
      last_name: last_name,
      photo: photo,
      city: city,
      bio: bio
    });
  }
  checkUploadResult = (error, resultEvent) => {
    if (resultEvent.event === "success") {
      this.setState({ photo: resultEvent.info.url });
    }
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
    console.log(typeof post_id);
    console.log("hit");
    this.props.deletePost(post_id);
  };
  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleEditProfile = () => {
    const { first_name, last_name, photo, bio, city } = this.state;
    const editedProfile = { first_name, last_name, photo, bio, city };
    this.props.editProfile(editedProfile);
    alert("You've changed your profile settings.");
  };
  handleFollowUser = () => {
    console.log(this.props.match.params);
    this.props.followUser(this.props.match.params.username);
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
    const mappedPosts = this.props.user
      ? user[1].map((track, i) => {
          return (
            <div className="AudioPlayer-Container" key={i}>
              <div>
                <AudioPlayer
                  title={track.title}
                  genre={track.genre}
                  audioUrl={track.audio_url}
                />
                {this.props.user_id === track.user_id ? (
                  <div>
                    <button>Edit</button>
                    <div>
                      <form>
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <label>Title</label>
                              </td>
                              <td>
                                <input
                                  className="title"
                                  onChange={e =>
                                    this.setState({ title: e.target.value })
                                  }
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <label>Genre</label>
                              </td>
                              <td>
                                <select
                                  name="genre"
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
                        <button
                          onClick={e => {
                            this.handleEditPost(e, track.post_id);
                          }}
                        >
                          Save
                        </button>
                      </form>
                      <button
                        onClick={() => {
                          this.handleDeletePost(track.post_id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  console.log(undefined)
                )}
              </div>

              <button>Edit Profile</button>
              <div className="Edit-profile-container">
                <input
                  name="first_name"
                  onChange={this.handleInput}
                  value={this.state.first_name}
                  placeholder="First Name"
                />
                <input
                  name="last_name"
                  onChange={this.handleInput}
                  value={this.state.last_name}
                  placeholder="Last Name"
                />
                <input
                  name="city"
                  onChange={this.handleInput}
                  value={this.state.city}
                  placeholder="City"
                />
                <textarea
                  name="bio"
                  rows="4"
                  onChange={this.handleInput}
                  value={this.state.bio}
                  placeholder="Bio"
                />
                <button onClick={() => widget.open()}>Upload Photo</button>
                <button onClick={() => this.handleEditProfile()}>
                  Change Profile Settings
                </button>
              </div>
            </div>
          );
        })
      : null;

    return (
      <div className="Profile-container">
        <h1>Profile</h1>
        <header>
          <p>{this.props.user && this.props.user[0][0].username}</p>
          <p>{this.props.user && this.props.user[0][0].city}</p>
          <p>{this.props.user && this.props.user[0][0].bio}</p>
          <p>{this.props.user && this.props.user[0][0].photo}</p>
          <p>{this.props.user && this.props.user[0][0].follow_count}</p>
          {this.props.username !== this.props.match.params.username
          ?
          <button onClick={(this.handleFollowUser)}>Follow</button>
          : null
          }
        </header>
        <main>{mappedPosts}</main>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.profReducer.user,
    user_id: reduxState.authReducer.user_id,
    first_name: reduxState.authReducer.first_name,
    last_name: reduxState.authReducer.last_name,
    city: reduxState.authReducer.city,
    photo: reduxState.authReducer.photo,
    bio: reduxState.authReducer.bio
  };
};

export default connect(
  mapStateToProps,
  { editProfile, getProfile, editPost, deletePost, getSession, followUser }
)(Profile);
