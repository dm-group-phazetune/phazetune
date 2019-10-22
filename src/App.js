import React from "react";
import routes from "./routes";
import Header from "./Components/Header/Header";
import "./styles/main.scss";
import AudioUpload from "./Components/FireAudioUpload/AudioUpload";

function App() {
  return (
    <div className="App">
      <Header />
      <AudioUpload />
      <h1>{routes}</h1>
    </div>
  );
}

export default App;
