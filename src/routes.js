import React from "react";
import { Switch, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Newsfeed from "./Components/Newsfeed/Newsfeed";
import Explore from "./Components/Explore/Explore";
import Profile from "./Components/Profile/Profile";
import Chat from "./Components/Chat/Chat";

export default (
  <Switch>
    <Route component={Landing} exact path="/" />
    <Route component={Newsfeed} exact path="/newsfeed" />
    <Route component={Explore} exact path="/explore" />
    <Route component={Profile} exact path="/profile" />
    <Route component={Chat} exact path="/chat" />
    <Route
      render={() => {
        return <h1>404 Page Not Found.</h1>;
      }}
    />
  </Switch>
);
