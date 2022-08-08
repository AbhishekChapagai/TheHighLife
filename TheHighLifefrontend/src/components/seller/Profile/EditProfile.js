import { Button, makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import axoisInstance, { headers } from "../../../utils/sellerAxois";

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

const EditProfile = ({
  uid,
  fullname,
  setFullname,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  address,
  setAddress,
}) => {
  const classes = useStyles();

  const [error, setError] = useState("");

  const updateUserProfile = (e) => {
    e.preventDefault();

    const obj = {
      fullname,
      email,
      phoneNumber,
      address,
    };

    axoisInstance
      .put(`seller/${uid}`, obj, {
        headers: headers,
      })
      .then((res) => {
        setError(res.data.message);
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      });
  };
  return (
    <div className={classes.paper}>
      <p align="center" style={{ color: "red" }}>
        {error}
      </p>

      <form className={classes.form} onSubmit={updateUserProfile} noValidate>
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
          id="Email"
          type="email"
          label="Email"
          name="Email"
          autoComplete="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="Phone no"
          label="Phone no"
          id="Phone no"
          type="number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          autoComplete="Phone no"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="address"
          label="Address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoComplete="address"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Edit
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
