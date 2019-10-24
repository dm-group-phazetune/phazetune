import React from 'react'
import "./dropzone.css";
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
            highlight: false
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
            <div style={style}
                className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                // style={{ cursor: this.props.disabled ? "default" : "pointer" }}
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
export default AudioUpload