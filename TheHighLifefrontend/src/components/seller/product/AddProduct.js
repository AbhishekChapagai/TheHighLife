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
import React, { useEffect, useRef, useState } from "react";
import axoisInstance, { headers } from "../../../utils/sellerAxois";
import bsCustomFileInput from "bs-custom-file-input";

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

const AddProduct = ({ setProduct, uid }) => {
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
  const [file, setFile] = useState(null);
  const imgRef = useRef(null);

  const [error, setError] = useState("");

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

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

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const addProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pimage", file);
    formData.append("ProductName", ProductName);
    formData.append("ProductColor", ProductColor);
    formData.append("ProductCategory", ProductCategory);
    formData.append("ProductDescription", ProductDescription);
    formData.append("ProductPrice", ProductPrice);
    formData.append("ProductQuantity", ProductQuantity);
    formData.append("ProductSize", ProductSize);
    formData.append("ProductBrand", ProductBrand);
    formData.append("ProductAddedBy", uid);

    axoisInstance
      .post("/product/insert", formData, {
        headers: headers,
      })
      .then((res) => {
        setError(res.data.message);
        setFile(null);
        setProductName("");
        setProductColor("");
        setProductCategory(0);
        setProductDescription("");
        setProductPrice(0);
        setProductQuantity(0);
        setProductSize("");
        setProductBrand("");
        imgRef.current.value = "";

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
              console.log(err.response.data);
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
              console.log(err.response.data);
            });
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    // <Container component="main" maxWidth="sm">
    //   <CssBaseline />
    <div className={classes.paper}>
      <p align="center" style={{ color: "red" }}>
        {error}
      </p>
      <form className={classes.form} onSubmit={addProduct} noValidate>
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

        <br />
        <div className="custom-file">
          <input
            id="inputGroupFile01"
            type="file"
            className="custom-file-input"
            onChange={handleFileSelect}
            ref={imgRef}
          />
        </div>

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
            !ProductQuantity ||
            file === null
          }
          className={classes.submit}
        >
          Add
        </Button>
      </form>
    </div>
    // </Container>
  );
};

export default AddProduct;
