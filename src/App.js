import React from "react";
import routes from "./routes";
import Header from "./Components/Header/Header";
import "./styles/main.scss";
<<<<<<< HEAD
import AudioUpload from "./Components/FireAudioUpload/AudioUpload";

function App() {
  return (
    <div className="App">
      <Header />
      <AudioUpload />
=======
import Newsfeed from "./Components/Newsfeed/Newsfeed";
// import AudioUpload from './Components/FireAudioUpload/AudioUpload'
function App() {
  return (
    <div className="App">
      {/* <AudioUpload /> */}
      <Newsfeed />
>>>>>>> master
      <h1>{routes}</h1>
    </div>
  );
}

export default App;
