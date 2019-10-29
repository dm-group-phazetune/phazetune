import React from 'react'
import WaveSurfer from 'wavesurfer';
import {peaks} from './peaks'


class AudioPlayer extends React.Component {

    constructor() {
        super();
        this.audioRef = React.createRef();
    }
    
    componentDidMount() {
        console.log(this.props.audioUrl)
        // const audio = document.querySelector('#song');
        console.dir(this.audioRef.current);
    
        this.wavesurfer = WaveSurfer.create({
        barWidth: 1,
        cursorWidth: 1,
        container: '#waveform',
        backend: 'MediaElement',
        height: 80,
        progressColor: 'grey',
        responsive: true,
        waveColor: 'violet',
        cursorColor: '#4a74a5',
        });
        this.wavesurfer.load(this.audioRef.current,peaks);
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
                    
                    
            <div
            style={{ border: '3px solid grey', width: 500, height: 80, marginLeft: 600 }}
            id="waveform"
            />
            <audio
            ref={this.audioRef}
            id="song"
            src={this.props.audioUrl}
            />
        </div>
        );
    }
}


export default AudioPlayer

