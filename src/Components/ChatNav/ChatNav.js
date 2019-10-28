import React, { Component } from "react";
import { Link } from "react-router-dom";
import Chat from "../Chat/Chat";
import ArtistsChat from "../ArtistsChat/ArtistsChat";
import Producers from "../ProducersChat/ProducersChat";

class ChatNav extends Component {
  render() {
    return (
      <div className="ChatNav-container">
        <header className="ChatNav-title">Chatrooms</header>
        <hr width={200} />
        <main className="ChatNav-links-container">
          <ul>
            <li className="ChatNav-links">General</li>
            <li className="ChatNav-links">Artists</li>
            <li className="ChatNav-links">Producers</li>
          </ul>
        </main>
      </div>
    );
  }
}

export default ChatNav;
