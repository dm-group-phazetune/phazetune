import React, { Component } from "react";
import {connect} from 'react-redux'
import {editProfile} from '../../redux/reducers/profReducer'
import {getProfile} from '../../redux/reducers/profReducer'

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      userProf: [],
      editStatus: false,
      editFirstName: "",
      editLastName: "",
      editCity: "",
      editPhoto: "",
      editBio: ""
    };
  }
  componentDidMount() {
    this.props.getProfile(this.props.match.params.username);
  }

  handleClick = () => {
    this.setState({ editStatus: false }, this.handleEdit);
  };

  handleEdit = () => {
    this.props.editProfile();
  };

  render() {
    console.log(this.props.user);
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
              </div>
            </div>
          );
        })
      : null;

    return (
      <div className="Profile-container">
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

        <h1>Profile</h1>
        <header>
          <p>{this.props.user && this.props.user[0][0].username}</p>
          <p>{this.props.user && this.props.user[0][0].city}</p>
          <p>{this.props.user && this.props.user[0][0].bio}</p>
          <p>{this.props.user && this.props.user[0][0].photo}</p>
          <p>{this.props.user && this.props.user[0][0].follow_count}</p>
        </header>
        <main>
          {/* {this.props.user &&
            this.props.user.map((track, i) => {
              return (
                <div className="AudioPlayer-Container" key={i}>
                  <AudioPlayer
                    title={track.title}
                    genre={track.genre}
                    audioUrl={track.audio_url}
                  />
                </div>
              );
            })} */}
          {mappedPosts}
        </main>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.profReducer.user
  };
};

export default connect(
  mapStateToProps,
  { editProfile, getProfile }
)(Profile);
