import React, { Component } from "react";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super();
    this.state = {
      userProf: [],
      editStatus: false,
      editFirstName: "",
      editLastName: "",
      editCity: "",
      editBio: ""
    };
  }
<<<<<<< HEAD
  componentDidMount() {
    axios.get("/api/profile/user").then(res => {
      this.setState({ userProf: res.data });
    });
=======
  componentDidMount(){
    axios.get("/api/profile/user/:user_id").then(res => {
      this.setState({userProf: res.data})
    })
>>>>>>> master
  }

  handleClick = () => {
    this.setState({ editStatus: false }, this.handleEdit);
  };

  // handleEdit = () => {
  //   axios.put("/api/profile/user"), {
  //     editFirstName: this.state.editFirstName,
  //     editLastName: this.state.editLastName,
  //     editCity: this.state.editCity,
  //     editBio: this.state.editBio,
  //   }.then(res => {
  //     this.setState({
  //       editFirstName: res.data.first_name,
  //       editLastName: res.data.last_name,
  //       editCity: res.data.city,
  //       editBio: res.data.bio
  //     })
  //   })
  // }

  render() {
    return (
      <div className="Profile-container">
        {this.state.editStatus === false ? (
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

        <h1>Profile</h1>
      </div>
    );
  }
}

export default Profile;
