import React from "react";
import "./dropzone.css";
import {connect} from "react-redux";
import Axios from 'axios';

import {storage} from '../FireAudioUpload/firebase'
import AudioPlayer from './AudioPlayer'

class AudioUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            audio: null,
            audioUrl: '',
            progress: 0,
            //drop zone
            highlight: false,
            //add post
            title: "",
            genre:"",
        };
        //drop zone
        this.fileInputRef = React.createRef();
        this.openFileDialog = this.openFileDialog.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    //Drop zone
    openFileDialog() {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }
    onDragOver(event) {
        event.preventDefault();
        if (this.props.disabed) return;
        this.setState({ hightlight: true });
    }
    onDragLeave(event) {
        this.setState({ hightlight: false });
    }
    onDrop(event) {
        event.preventDefault();
        if (this.props.disabed) return;
        const files = event.dataTransfer.files;
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
        // console.log(audio);
        this.setState({audio: files[0].name})
        this.setState({ hightlight: false,
        });
    }
    //end of drop zone 
        handleChange = e => {
            console.log(e.target.files);
            if(e.target.files[0]){
                const audio = e.target.files[0]
                this.setState( () => ({audio}))
            }
        }
    handleClick = () => {
        const {audio} = this.state;
        const uploadTask = storage.ref(`audios/${audio.name}`).put(audio);
        const setThisState = (url) => {
            console.log(url);
            this.setState({audioUrl: url})
        }
        uploadTask.on('state_changed', 
        //progress bar function
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100
            this.setState({progress})
        },
        (error) => {
            console.log(error)
        },
        // completion function
        (completion) => {
            storage.ref('audios').child(audio.name).getDownloadURL().then(url => {
                console.log(url)
                setThisState(url)
                Axios.post("/api/posts", {
                    title: this.state.title,
                    genre: this.state.genre,
                    audioUrl: url
                })
            })
        })
    }
    render(){
        const style = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }
        return (
            <>
            <input className= "title"
            placeholder= "title"
            onChange={e => this.setState({title: e.target.value})}
            />
            <select name="genre">
                <option>SELECT</option>
                <option>Rock</option>
                <option>R&B/ Hip Hop</option>
                <option>Pop</option>
                <option>Country</option>
                <option>Dance/EDM</option>
                <option>Christian/Gospel</option>
                <option>Holiday/Seasonal</option>
                <option>Latin</option>
                <option>Jazz</option>
                <option>Classical</option>
                <option>Kids Music</option>
                <option>Other</option>
            </select>
            <div style={style}
                className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                onChange={this.handleChange}
                onFilesAdded={this.onFilesAdded}
                >
            </div>
            <progress value={this.state.progress} max="100" />
                <input 
                onChange={this.handleChange}
                ref= {this.fileInputRef}
                type= 'file'
                />
                <button onClick={this.handleClick}> Upload </button>
                <AudioPlayer audioUrl={this.state.audioUrl}/>
            </>
        )
    }
}
export default AudioUpload;
