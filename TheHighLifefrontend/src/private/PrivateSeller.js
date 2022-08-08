import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateSeller = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("JWTSeller") ||
      !(localStorage.getItem("JWTSeller") === undefined) ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/seller/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateSeller;
