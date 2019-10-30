import React, { Component } from "react";

class Newsfeed extends Component {
  render() {
    return (
      <div className="N-E-container">
        <header className="N-E-title">Newsfeed</header>
        <hr width={200} />
        <nav className="N-E-nav">
          <div className="N-E-nav-links">Home</div>
          <div className="N-E-nav-links">Favs</div>
        </nav>
        <main className="N-E-content"></main>
      </div>
    );
  }
}

export default Newsfeed;
