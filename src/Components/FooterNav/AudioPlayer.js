import React from "react";
import WaveSurfer from "wavesurfer";
// import { peaks } from "./peaks";

class AudioPlayer extends React.Component {
  constructor() {
    super();
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.audioUrl);
    console.dir(this.audioRef.current);
    // const audio = document.querySelector('#song');
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

  play = () => {
    this.wavesurfer.play();
  };
  pause = () => {
    this.wavesurfer.pause();
  };
  skipForward = () => {
    this.wavesurfer.skipForward();
  };
  toggleMute = () => {
    this.wavesurfer.toggleMute();
  };
  stop = () => {
    this.wavesurfer.stop();
  };

  render() {
    console.log(this.props.title);
    return (
      <div>
        <header className="Audio-header-container">
          <p className="Audio-title">{this.props.title}</p>
          <p className="Audio-genre">{this.props.genre}</p>
        </header>
        <main>
          <div
            id="waveform"
            style={{
              // border: "2px solid grey",
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
