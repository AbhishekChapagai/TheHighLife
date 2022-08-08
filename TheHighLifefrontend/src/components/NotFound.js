import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <h1 align="center" style={{ marginTop: "50px", color: "red" }}>
      Resource doesnot exist 404 !!!!!!
      <br />
      <Button component={Link} to="/" style={{ textTransform: "inherit" }}>
        Back to Home
      </Button>
    </h1>
  );
};

export default NotFound;
