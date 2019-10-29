import React from "react";
import WaveSurfer from "wavesurfer";
import { peaks } from "./peaks";

class AudioPlayer extends React.Component {
  constructor() {
    super();
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    console.log(this.props.audioUrl);
    // const audio = document.querySelector('#song');
    console.dir(this.audioRef.current);

    this.wavesurfer = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: "#waveform",
      backend: "MediaElement",
      height: 80,
      progressColor: "grey",
      responsive: true,
      waveColor: "violet",
      cursorColor: "#4a74a5"
    });

    console.log(Math.random(peaks));
    this.wavesurfer.load(this.audioRef.current, peaks);
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
    return (
      <>
        <header className="Audio-header-container">
          <title className="Audio-title">{this.props.title}</title>
          <p className="Audio-genre">{this.props.genre}</p>
        </header>
        <main>
          <div
            className="AudioPlayer"
            style={{ border: "2px solid grey", width: 350, height: 80 }}
            id="waveform"
          />
          <audio ref={this.audioRef} id="song" src={this.props.audioUrl} />
          <button onClick={this.play}>Play</button>
          <button onClick={this.pause}>Pause</button>
          <button onClick={this.skipForward}>Skip Forward</button>
          <button onClick={this.toggleMute}>Mute</button>
          <button onClick={this.stop}>Stop</button>
        </main>
      </>
    );
  }
}

export default AudioPlayer;

// "https://firebasestorage.googleapis.com/v0/b/phazetune.appspot.com/o/1-02%20Light%20(feat.%20Jeremih).mp3?alt=media&token=be0f7e8a-4dfe-4bc6-a795-2cd1a7ba25ad"
