import {
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import axoisInstance from "../../utils/axois";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    // width: 500,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow:
      "0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
    color: "black",
    padding: 50,
    borderRadius: 15,
    marginBottom: 25,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: "#3A8057 !important",
    textTransform: "none",
  },
}));

const SellerRegister = () => {
  const classes = useStyles();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const registerUser = (e) => {
    e.preventDefault();

    const user = {
      fullname,
      email,
      password,
      phoneNumber,
      address,
    };
    axoisInstance
      .post("/seller/upload", user)
      .then((response) => {
        console.log(response.data);
        history.push("/seller/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response.data);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign Up Seller
        </Typography>
        <p align="center" style={{ color: "red" }}>
          {error}
        </p>
        <form className={classes.form} onSubmit={registerUser} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Full Name"
            name="fullname"
            autoComplete="fullname"
            autoFocus
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            type="number"
            fullWidth
            name="phone"
            label="Phone Number"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="current-phone"
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            {/* <Grid item xs>
                <Link to="#" variant="body2" style={{ color: "#3A8057" }}>
                  Seller sign in?
                </Link>
              </Grid> */}
            <Grid item>
              <Link
                to="/seller/login"
                style={{ color: "#3A8057" }}
                variant="body2"
              >
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SellerRegister;
