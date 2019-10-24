import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Newsfeed from "./Components/Newsfeed/Newsfeed";
import Explore from "./Components/Explore/Explore";
import Profile from "./Components/Profile/Profile";
import Chat from "./Components/Chat/Chat";
import ArtistsChat from "./Components/ArtistsChat/ArtistsChat";
// import ChatCard from "./Components/ChatCard/ChatCard";

export default (
  <Switch>
    <Route component={Landing} exact path="/" />
    <Route component={Newsfeed} path="/newsfeed" />
    <Route component={Explore} path="/explore" />
    <Route component={Profile} path="/profile" />
    <Route component={Chat} path="/chat" />
    <Route component={ArtistsChat} exact path="/chat/artists" />
    {/* <Route component={ChatCard} path="/chatcard" /> */}
    <Route
      render={() => {
        return <h1>404 Page Not Found.</h1>;
      }}
    />
  </Switch>
);
