import React from 'react'

class AudioUpload extends React.Component {
    constructor(){
        super()
        this.state = {
            
        }
    }
    render(){
        const style = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh'
        }

        return (
            <>
            <div style={style}>
                <input type= 'file'/>
                <button> Upload </button>
                
            </div>
            </>

        )
    }
}
export default AudioUpload