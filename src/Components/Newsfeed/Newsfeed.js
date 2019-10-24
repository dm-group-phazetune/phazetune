import React, { Component } from "react";
import Axios from "axios";
import AudioUpload from "./AudioUpload";
import AudioPlayer from "./AudioPlayer";

class Newsfeed extends Component {
  constructor(){
    super();
    this.state = {
      pastPost: []
    }
  }
  componentDidMount(){
    this.fetchPost();
  }
  updatePastPost = postArr => {
    this.setState({pastPost : postArr});
  }
  fetchPost = () => {
    Axios.get('/api/users/post').then(response => {
      this.setState({pastPost : response.data})
    })
  }
  render() {
    return (
      <>
        <div>
          <AudioUpload />
          {/* <AudioPlayer /> */}
        </div>
      </>
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
