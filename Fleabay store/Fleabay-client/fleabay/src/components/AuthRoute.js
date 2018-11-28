import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = props => {
  const { isAuth, component, ...restProps } = props;
  const Component = component;

  return (
    <Route
      render={routeProps => {
        if (isAuth) {
          // return React.createElement(component, routeProps);
          return <Component {...routeProps} />;
        } else {
          return <Redirect to="/session/new" />;
        }
      }}
      {...restProps}
    />
  );
};

export default AuthRoute;
