import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserAuth } from "../utils/userAuth";

const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
  const { accessToken } = getUserAuth();

  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        accessToken && restricted ? (
          <Redirect to="/chats" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
