import {
  Button,
  // Container,
  // CssBaseline,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
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

const EditProduct = ({ setProduct, eid }) => {
  const classes = useStyles();

  const [ProductName, setProductName] = useState("");
  const [ProductColor, setProductColor] = useState("");
  const [ProductCategory, setProductCategory] = useState(0);
  const [ProductDescription, setProductDescription] = useState("");
  const [ProductPrice, setProductPrice] = useState(0);
  const [ProductQuantity, setProductQuantity] = useState(0);
  const [ProductSize, setProductSize] = useState("");
  const [ProductBrand, setProductBrand] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axoisInstance
      .get("/category/all")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
    axoisInstance
      .get(`/product/single/${eid}`)
      .then((response) => {
        setProductName(response.data.ProductName);
        setProductColor(response.data.ProductColor);
        setProductDescription(response.data.ProductDescription);
        setProductPrice(response.data.ProductPrice);
        setProductQuantity(response.data.ProductQuantity);
        setProductSize(response.data.ProductSize);
        setProductBrand(response.data.ProductBrand);
        setProductCategory(response.data.ProductCategory);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [eid]);

  const editProduct = (e) => {
    e.preventDefault();

    const obj = {
      ProductName,
      ProductColor,
      ProductCategory,
      ProductDescription,
      ProductPrice,
      ProductQuantity,
      ProductSize,
      ProductBrand,
    };

    axoisInstance
      .put(`product/update/${eid}`, obj, {
        headers: headers,
      })
      .then((res) => {
        setError(res?.data?.message);
        if (
          localStorage.getItem("type") === undefined ||
          localStorage.getItem("type") === "admin"
        ) {
          axoisInstance
            .get("/product/showall", {
              headers: headers,
            })
            .then((res) => {
              setProduct(res.data);
            })
            .catch((err) => {
              console.log(err?.response?.data);
            });
        } else {
          axoisInstance
            .get("/product/seller/showall", {
              headers: headers,
            })
            .then((res) => {
              setProduct(res.data);
            })
            .catch((err) => {
              console.log(err?.response?.data);
            });
        }
      })
      .catch((err) => {
        setError(err?.response?.data?.message);
      });
  };

  return (
    // <Container component="main" maxWidth="sm">
    //   <CssBaseline />
    <div className={classes.paper}>
      <p align="center" style={{ color: "red" }}>
        {error}
      </p>

      <form className={classes.form} onSubmit={editProduct} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="fproduct name"
          label="Product Name"
          name="product name"
          autoComplete="product name"
          autoFocus
          value={ProductName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="product color"
          label="Product Color"
          name="productcolor"
          autoComplete="productcolor"
          value={ProductColor}
          onChange={(e) => setProductColor(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="product description"
          label="Product Description"
          id="prodct description"
          value={ProductDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          autoComplete="productdescription"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          type="number"
          fullWidth
          name="product price"
          label="Product price"
          id="product price"
          value={ProductPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          autoComplete="productprice"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="product quantity"
          type="number"
          label="Product Quantity"
          name="product quantity"
          autoComplete="product quantity"
          value={ProductQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="product size"
          label="Product Size"
          id="prodct size"
          value={ProductSize}
          onChange={(e) => setProductSize(e.target.value)}
          autoComplete="productsize"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="product brand"
          label="Product Brand"
          id="prodct brand"
          value={ProductBrand}
          onChange={(e) => setProductBrand(e.target.value)}
          autoComplete="productbrand"
        />

        <p align="center">
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={ProductCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            label="Age"
          >
            <MenuItem value={0}>
              <em>Choose here..</em>
            </MenuItem>

            {categories.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </p>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={
            ProductCategory === 0 ||
            ProductPrice === 0 ||
            !ProductPrice ||
            ProductQuantity === 0 ||
            !ProductQuantity
          }
          className={classes.submit}
        >
          Edit
        </Button>
      </form>
    </div>
    // </Container>
  );
};

export default EditProduct;
