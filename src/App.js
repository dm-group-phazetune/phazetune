import React from "react";
import routes from "./routes";
import Header from "./Components/Header/Header";
import "./styles/main.scss";
// import Newsfeed from "./Components/Newsfeed/Newsfeed";
// import AudioUpload from './Components/FireAudioUpload/AudioUpload'
function App() {
  return (
    <div className="App">
      <Header />
      {/* <AudioUpload /> */}
      {/* <Newsfeed /> */}
      {routes}
    </div>
  );
}

export default App;
