import React from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute path="/auth" restricted component={Auth} />
        <PrivateRoute path="/chats" component={Home} />
        <Redirect from="/" to="/chats" />
      </Switch>
    </Router>
  );
};

export default App;
