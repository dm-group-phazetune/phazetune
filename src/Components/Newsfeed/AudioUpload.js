import React from 'react'
import {storage} from '../FireAudioUpload/firebase'

class AudioUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            audio: null,
            audio_url: ''
        }
    }

    handleChange = e => {
        if(e.target.files[0]){
            const audio = e.target.files[0]
            this.setState( () => ({audio}))
        }
    }
    handleClick = () => {
        const {audio} = this.state;
        const uploadTask = storage.ref(`audios/${audio.name}`).put(audio);
        const setThisState = (url) => {
            this.setState({audioUrl: url})
        }
        uploadTask.on('state_changed', 
        //progress bar function
        (snapshot) => {

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
            <div style={style}>
                <input type= 'file' onChange={this.handleChange}/>
                <button onClick={this.handleClick}> Upload </button>
                
            </div>
            </>
        )
    }
}
export default AudioUpload