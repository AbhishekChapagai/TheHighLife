import { Chip, makeStyles } from "@material-ui/core";
import React from "react";
import axoisInstance from "../utils/axois";

const useStyles = makeStyles((theme) => ({
  categories: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: "20px",
    marginLeft: "5%",
    paddingBottom: "20px",
  },
}));
const Categories = ({ categories, setProduct }) => {
  const classes = useStyles();

  const getProduct = (id) => {
    axoisInstance
      .get(`/product/category/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
      });
  };

  const getAllProducts = () => {
    axoisInstance
      .get("/product/showall")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
        // alert(err.response?.data?.message);
      });
  };
  return (
    <div className={classes.categories}>
      <Chip label="all" onClick={getAllProducts} />
      {categories.map((cat) => (
        <Chip
          key={cat._id}
          label={cat.name}
          onClick={() => getProduct(cat._id)}
        />
      ))}
    </div>
  );
};

export default Categories;
