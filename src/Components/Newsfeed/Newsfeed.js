import React, { Component } from "react";

class Newsfeed extends Component {
  render() {
    return (
      <div className="N-E-container">
        <header className="N-E-title">Newsfeed</header>
        <nav className="N-E-nav">
          <div>Home</div>
          <div>Favs</div>
        </nav>
        <main className="N-E-content"></main>
      </div>
    );
  }
}

export default Newsfeed;
