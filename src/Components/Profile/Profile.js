import React, { Component } from "react";
import { connect } from "react-redux";
import { editProfile, getProfile } from "../../redux/reducers/profReducer";
import { getSession } from "../../redux/reducers/authReducer";

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
    console.log(this.props);

    // let userMapped = "Loading...";
    // if (this.props.user) {
    //   userMapped = this.props.user.map((el, i) => {
    //     return (
    //       <div key={i}>
    //         <h1>{el.username}</h1>
    //         <h2>{el.first_name}</h2>
    //       </div>
    //     );
    //   });
    // }
    // const { first_name, last_name, bio, photo, follow_count } = this.props.user;
    return (
      <div className="Profile-container">
        {/* {this.props.user[0].username ? <h1>{this.props.user[0].username}</h1> : null} */}
        {/* <h1>{this.props.user[0].username}</h1> */}
        <h1></h1>
        <h1></h1>
        <h1></h1>
        <h1></h1>
        <h1></h1>
        <h1></h1>

        {/* {this.state.editStatus === false ? (
          <>
            <h3>{this.state.editFirstName}</h3>
            <h3>{this.state.editLastName}</h3>
            <h3>{this.state.editCity}</h3>
            <h3>{this.state.editBio}</h3>
            <img src={this.state.editPhoto} />
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
        {this.props.user &&
          this.props.user.map((el, i) => {
            return (
              <div key={i}>
                <h1>{el.username}</h1>
                <h2>{el.first_name}</h2>
              </div>
            );
          })}
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
