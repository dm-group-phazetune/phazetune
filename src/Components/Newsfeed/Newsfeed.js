import React, { Component } from "react";
import WaveSurfer from 'wavesurfer';
import {peaks} from './peaks'
import AudioUpload from '../FireAudioUpload/AudioUpload'
// import ReactWaveSurfer from 'react-wavesurfers'




class Newsfeed extends Component {

  componentDidMount() {
    const audio = document.querySelector('#song');

    this.wavesurfer = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'MediaElement',
      height: 80,
      progressColor: 'grey',
      responsive: true,
      waveColor: 'violet',
      cursorColor: '#4a74a5',
    });

    this.wavesurfer.load(audio, peaks);
  }


  play = () => {
    this.wavesurfer.play();
  };
  pause = () => {
    this.wavesurfer.pause()
  }
  skipForward = () => {
    this.wavesurfer.skipForward()
  }
  toggleMute = () => {
    this.wavesurfer.toggleMute()
  }
  render() {
    return (
      <div>

        <button onClick={this.play} 
                style={{marginLeft: 850}}>Play</button>

        <button onClick={this.pause} 
                style={{marginLeft: 850}}>Pause</button>

        <button onClick={this.skipForward} 
                style={{marginLeft: 850}}>Skip Forward</button>

        <button onClick={this.toggleMute} 
                style={{marginLeft: 850}}>Mute</button>
                <AudioUpload />
                
        <div
          style={{ border: '3px solid grey', width: 500, height: 80, marginLeft: 600 }}
          id="waveform"
        />
        <audio
          id="song"
          src="https://firebasestorage.googleapis.com/v0/b/phazetune.appspot.com/o/1-02%20Light%20(feat.%20Jeremih).mp3?alt=media&token=be0f7e8a-4dfe-4bc6-a795-2cd1a7ba25ad"
        />
      </div>
    );
  }
}

export default Newsfeed;
