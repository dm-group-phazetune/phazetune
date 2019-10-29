import React, { Component } from "react";
import { connect } from "react-redux";
import { editProfile, getProfile } from "../../redux/reducers/profReducer";
import { editPost, deletePost } from "../../redux/reducers/postsReducer";
import AudioPlayer from "../FooterNav/AudioPlayer";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      editStatus: false,
      title: "",
      genre: ""
    };
  }
  componentDidMount() {
    this.props.getProfile(this.props.match.params.username);
  }

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

  handleEditProfile = () => {
    this.props.editProfile();
  };

  render() {
    const { user } = this.props;

    // const posts = [...user];
    const mappedPosts = this.props.user
      ? user[1].map((track, i) => {
          return (
            <div>
              <div className="AudioPlayer-Container" key={i}>
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
            </div>
          );
        })
      : null;

    return (
      <div className="Profile-container">
<<<<<<< HEAD
        {/* {this.state.editStatus === false ? (
          <>
            <h3>{this.state.editFirstName}</h3>
            <h3>{this.state.editLastName}</h3>
            <h3>{this.state.editCity}</h3>
            <h3>{this.state.editBio}</h3>
          </>
        ) : (
          <>
            <input
              defaultValue={this.state.editFirstName}
              onChange={e => this.setState({ editFirstName: e.target.value })}
            />
            <input
              defaultValue={this.state.editLastName}
              onChange={e => this.setState({ editLastName: e.target.value })}
            />
            <input
              defaultValue={this.state.editCity}
              onChange={e => this.setState({ editCity: e.target.value })}
            />
            <input
              defaultValue={this.state.editBio}
              onChange={e => this.setState({ editBio: e.target.value })}
            />
          </>
        )}

        {this.state.editStatus === true ? (
          <button onClick={() => this.setState({ editStatus: true })}>
            Edit
          </button>
        ) : (
          <button onClick={this.handleClick}>Save</button>
        )}
        <h1>{this.props.username}</h1>
        <h1>{this.props.city}</h1>
        <h1>{this.props.bio}</h1> */}

=======
>>>>>>> master
        <h1>Profile</h1>
        <header>
          <p>{this.props.user && this.props.user[0][0].username}</p>
          <p>{this.props.user && this.props.user[0][0].city}</p>
          <p>{this.props.user && this.props.user[0][0].bio}</p>
          <p>{this.props.user && this.props.user[0][0].photo}</p>
          <p>{this.props.user && this.props.user[0][0].follow_count}</p>
        </header>
        <main>{mappedPosts}</main>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.profReducer.user,
    user_id: reduxState.authReducer.user_id
  };
};

export default connect(
  mapStateToProps,
  { editProfile, getProfile, editPost, deletePost }
)(Profile);
