import React, { Component } from "react";
import axios from 'axios'
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
  componentDidMount(){
    this.props.getProfile()
  }

  handleClick = () => {
    this.setState({ editStatus: false });
  };


  handleEdit = () => {
    this.props.editProfile()
  }
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
            <img src ={this.props.photo}/>
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


// const mapStateToProps = (reduxState) => {
//   return {

    
//   }
// }

export default connect (undefined, {editProfile, getProfile}) (Profile);
