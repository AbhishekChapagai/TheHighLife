import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axoisInstance, { headers } from "../../../utils/sellerAxois";
import AppTop from "../../AppTop";
import SellerNav from "../SellerNav";
import AddProduct from "./AddProduct";
import ProductTable from "./ProductTable";
import CloseIcon from "@material-ui/icons/Close";

const Product = () => {
  const history = useHistory();
  const [product, setProduct] = useState([]);
  const [uid, setUid] = useState("");
  const [query, setQuery] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axoisInstance
      .get("/seller/profileByToken", {
        headers: headers,
      })
      .then((res) => {
        setUid(res.data._id);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("JWTSeller") === undefined ||
      !localStorage.getItem("JWTSeller")
    ) {
      history.push("/");
    }
  }, [history]);

  const searchProducts = (e) => {
    setQuery(e.target.value);

    if (!query) {
      return;
    }
    axoisInstance.get(`/product/search/${e.target.value}`).then((res) => {
      setProduct(res.data);
    });
  };

  return (
    <div>
      <AppTop />
      <SellerNav />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <input
            type="text"
            style={{ width: "80%", marginLeft: "10%", height: "25px" }}
            placeholder="Search Products"
            value={query}
            onChange={searchProducts}
          />
        </div>
        <div style={{ marginRight: "5%" }}>
          <Button onClick={handleClickOpen}>Add Product</Button>
        </div>
      </div>

      {/* Dialog box add product---------------- */}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          <div style={{ display: "flex" }}>
            <div>Add Product</div>
            <div style={{ flex: 1 }}></div>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers>
          <AddProduct product={product} setProduct={setProduct} uid={uid} />
        </DialogContent>
      </Dialog>
      {/* -------------------dialog close */}

      <ProductTable product={product} action={true} setProduct={setProduct} />
    </div>
  );
};

export default Product;
