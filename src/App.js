import React from "react";
import routes from "./routes";
import "./styles/main.scss";
import AudioUpload from './Components/FireAudioUpload/AudioUpload'
function App() {
  return (
    <div className="App">
      <AudioUpload />
      <h1>{routes}</h1>
    </div>
  );
}

export default App;

