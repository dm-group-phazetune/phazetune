import React, { Component } from "react";
import AudioUpload from './AudioUpload'
import AudioPlayer from './AudioPlayer'


class Newsfeed extends Component {

  render(){
    return (
      <>
      <div>
        <AudioUpload />
        <AudioPlayer />
        
      </div>

      </>
    )
  }
}

export default Newsfeed;
