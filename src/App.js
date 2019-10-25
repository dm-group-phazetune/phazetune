import React from "react";
import routes from "./routes";
import Header from "./Components/Header/Header";
import FooterNav from "./Components/FooterNav/FooterNav";
import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <FooterNav />
      {routes}
    </div>
  );
}

export default App;
