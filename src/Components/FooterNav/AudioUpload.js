import React from "react";
import "./dropzone.css";
import Axios from "axios";
import { storage } from "../FireAudioUpload/Firebase"; 
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { withRouter } from "react-router-dom";

class AudioUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      audioUrl: "",
      progress: 0,
      //drop zone
      highlight: false,
      //add post
      title: "",
      genre: ""
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
    this.setState({ audio: files[0].name });
    this.setState({ highlight: false });
  }
  //end of drop zone
  handleChange = e => {
    if (e.target.files[0]) {
      const audio = e.target.files[0];
      this.setState(() => ({ audio }));
    }
  };
  //firebase upload
  handleClick = () => {
    const { audio } = this.state;

    const uploadTask = storage.ref(`audios/${audio.name}`).put(audio);

    const setThisState = url => {
      this.setState({ audioUrl: url });
    };
    uploadTask.on(
      "state_changed",
      //progress bar function
      snapshot => {
        const progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ progress });
      },
      error => {
        console.log(error);
      },
      // completion function
      completion => {
        storage
          .ref("audios")
          .child(audio.name)
          .getDownloadURL()
          .then(url => {
            console.log(url);
            setThisState(url);
            Axios.post("/api/posts", {
              title: this.state.title,
              genre: this.state.genre,
              audioUrl: url
            });
          });
      }
    );
    this.props.closeAudioUpload(this.setState({ upload: false }));
    this.props.history.push("/explore");
  };
  handlePlaceChange = event => {
    this.setState({ genre: event.target.value });
  };

  render() {
    return (
      <div>
        <Dialog
          style={{ textAlign: "center" }}
          className="Dialog-container"
          onClose={this.props.closeAudioUpload}
          open={this.props.upload}
        >
          <DialogContent className="Dialog-title">Add Track</DialogContent>
          <DialogContent className="Dialog-content">
            <table>
              <tbody>
                <tr>
                  <td className="Dialog-label">
                    <label>title:</label>
                  </td>
                  <td className="Dialog-input">
                    <input
                      className="input-text"
                      onChange={e => this.setState({ title: e.target.value })}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="Dialog-label">
                    <label>genre:</label>
                  </td>
                  <td className="Dialog-input">
                    <select
                      name="genre"
                      className="input-select"
                      onChange={this.handlePlaceChange}
                    >
                      <option>Select</option>
                      <option>Rock</option>
                      <option>RB/ Hip-Hop</option>
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
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="Dialog-label">upload:</label>
                  </td>
                  <td className="Dialog-input">
                    <label htmlFor="file-upload" className="Input-file">
                      Choose File
                    </label>
                    <input
                      id="file-upload"
                      onChange={this.handleChange}
                      ref={this.fileInputRef}
                      type="file"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="Dialog-label">Drag&Drop:</label>
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <div
                className={`Dropzone ${
                  this.state.highlight ? "Highlight" : ""
                }`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                onChange={this.handleChange}
                onFilesAdded={this.onFilesAdded}
              />
            </div>

            {/* <div>
              <progress value={this.state.progress} max="100" />
            </div> */}
            {/* <div>
              <input
                onChange={this.handleChange}
                ref={this.fileInputRef}
                type="file"
              />
            </div> */}
            <button
              className="Dialog-btn Dialog-btn-style"
              onClick={this.handleClick}
            >
              Upload
            </button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default withRouter(AudioUpload);
