import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Newsfeed from "./Components/Newsfeed/Newsfeed";
import Explore from "./Components/Explore/Explore";
import Profile from "./Components/Profile/Profile";
import ChatNav from "./Components/ChatNav/ChatNav";
import Chat from "./Components/Chat/Chat";
import ArtistsChat from "./Components/ArtistsChat/ArtistsChat";
import ProducersChat from "./Components/ProducersChat/ProducersChat";

export default (
  <Switch>
    <Route component={Landing} exact path="/" />
    <Route component={Newsfeed} path="/newsfeed" />
    <Route component={Explore} path="/explore" />
    <Route component={Profile} path="/profile" />
    <Route component={ChatNav} exact path="/chat" />
    <Route component={Chat} exact path="/chat/general" />
    <Route component={ArtistsChat} exact path="/chat/artists" />
    <Route component={ProducersChat} exact path="/chat/producers" />
    <Route
      render={() => {
        return <h1>404 Page Not Found.</h1>;
      }}
    />
  </Switch>
);
