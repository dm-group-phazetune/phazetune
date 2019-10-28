import React, { Component } from "react";
import { Link } from "react-router-dom";
// import Chat from "../Chat/Chat";
// import ArtistsChat from "../ArtistsChat/ArtistsChat";
// import Producers from "../ProducersChat/ProducersChat";

class ChatNav extends Component {
  render() {
    return (
      <div className="ChatNav-container">
        <header className="ChatNav-title">Chatrooms</header>
        <hr width={200} />
        <main className="ChatNav-links-container">
          <ul>
            <Link to="/chat/general">
              <li className="ChatNav-links">General</li>
            </Link>
            <Link to="/chat/artists">
              <li className="ChatNav-links">Artists</li>
            </Link>
            <Link to="/chat/producers">
              <li className="ChatNav-links">Producers</li>
            </Link>
          </ul>
        </main>
      </div>
    );
  }
}

export default ChatNav;
