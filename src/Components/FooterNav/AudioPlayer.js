import React from "react";
import WaveSurfer from "wavesurfer";
import WaveformData from 'waveform-data'
import { peaks } from "./peaks";


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
      mediaControls: true,
      // height: 80,
      // fillParent: true,
      // normalize: true,
      // progressColor: "grey",
      // responsive: true,
      // waveColor: "black",
      // cursorColor: "#4a74a5"
    });
<<<<<<< HEAD

    console.log(Math.random(peaks));
    this.wavesurfer.load(this.audioRef.current, peaks);
=======
    
    this.wavesurfer.load(this.audioRef.current);
>>>>>>> master
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
            className="AudioPlayer-Container"
            id="waveform"
            style={{  
                      // border: "2px solid grey", 
                      width: 0, 
                      height: 100
                    }}
          >

          <audio ref={this.audioRef} src={this.props.audioUrl} />
        
          </div>
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


