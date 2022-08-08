import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import axoisInstance, { headers } from "../../../utils/sellerAxois";
import { MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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

const AddCategory = ({ setCategories }) => {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [cat, setCat] = useState(0);

  const addCategory = (e) => {
    e.preventDefault();

    const category = {
      name: cat,
    };

    axoisInstance
      .post("/category/insert", category, {
        headers: headers,
      })
      .then((response) => {
        console.log(response.data);
        setCat(0);
        setError(`${cat} added successfully`);

        axoisInstance
          .get("/category/all")
          .then((res) => {
            setCategories(res.data);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      })
      .catch((err) => {
        // console.log(err.response);
        setError(err?.response?.data?.message);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Category
        </Typography>
        <p align="center" style={{ color: "red" }}>
          {error}
        </p>
        <form className={classes.form} onSubmit={addCategory} noValidate>
          <p align="center">
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              label="Age"
            >
              <MenuItem value={0}>
                <em>Choose here..</em>
              </MenuItem>
              <MenuItem value={"men"}>men</MenuItem>
              <MenuItem value={"women"}>women</MenuItem>
              <MenuItem value={"kids"}>kids</MenuItem>
              <MenuItem value={"accessories"}>accessories</MenuItem>
            </Select>
          </p>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={cat === 0}
          >
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddCategory;
