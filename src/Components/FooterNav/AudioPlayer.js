import React from "react";
import WaveSurfer from "wavesurfer";
import { Link } from "react-router-dom";

class AudioPlayer extends React.Component {
  constructor() {
    super();
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.audioUrl);
    console.dir(this.audioRef.current);
    this.wavesurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 0,
      container: "#waveform",
      backend: "MediaElement",
      mediaControls: true
      // height: 80,
      // fillParent: true,
      // normalize: true,
      // progressColor: "grey",
      // responsive: true,
      // waveColor: "black",
      // cursorColor: "#4a74a5"
    });
    this.wavesurfer.load(this.audioRef.current);
  }

  render() {
    console.log(this.props.title);
    return (
      <div>
        <header className="Audio-header-container">
          <Link to={`/profile/user/${this.props.username}`}>
            <p>{this.props.username}</p>
          </Link>
          <p className="Audio-title">{this.props.title}</p>
          <p className="Audio-genre">{this.props.genre}</p>
        </header>
        <main>
          <div
            id="waveform"
            style={{
              width: 0,
              height: 100
            }}
          >
            <audio ref={this.audioRef} src={this.props.audioUrl} />
          </div>
        </main>
      </div>
    );
  }
}

export default AudioPlayer;
