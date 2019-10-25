import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="Landing-container">
        <header className="Landing-header">
          <div className="Landing-title">PHAZETUNE</div>
          <div className="Landing-subtitle">
            A music platform where you can share content, connect with artists,
            and develop a sense of community.
          </div>
        </header>
        <main>Phazetune Features</main>
        <main>Mission Statement</main>
        <footer>About the team</footer>
      </div>
    );
  }
}

export default Landing;
