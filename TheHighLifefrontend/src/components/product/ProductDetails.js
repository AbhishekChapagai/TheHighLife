import { Button, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import axoisInstance, { API_URL, headers } from "../../utils/axois";
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
  productDetails: {
    background: "#F7F8F9",
    paddingTop: "25px",
    height: "auto",
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "100px",
  },
  detailsContent: {
    display: "flex",
    justifyContent: "space-around",
    background: "white",
    marginTop: "30px",
    marginBottom: "200px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  productImage: {
    height: "auto",
    width: "300px",
    objectFit: "contain",
    marginTop: "25px",
  },
}));

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const classes = useStyles();
  const { id } = useParams();
  const [uid, setUid] = useState("");

  useEffect(() => {
    axoisInstance
      .get("buyer/profileByToken", {
        headers: headers,
      })
      .then((res) => {
        setUid(res?.data?._id);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  }, []);

  useEffect(() => {
    axoisInstance
      .get(`/product/single/${id}`)
      .then((product) => {
        setProduct(product.data);
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  }, [id]);

  return (
    <div className={classes.productDetails}>
      {!product.ProductName ? (
        <Typography variant="body2" color="textSecondary" align="center">
          Product Not found
        </Typography>
      ) : (
        <>
          <p align="center">Home / Product/ {product.ProductName}</p>
          <div className={classes.detailsContent}>
            <div>
              <a href={`${API_URL}/image/${product?.ProductImage}`}>
                <img
                  src={`${API_URL}/image/${product?.ProductImage}`}
                  alt={product?.ProductName}
                  className={classes.productImage}
                />
              </a>
            </div>

            <div style={{ marginLeft: "2%", marginTop: "25px" }}>
              <h1>{product.ProductName}</h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography gutterBottom={false} variant="h6" component="h6">
                  Rs {product.ProductPrice}
                </Typography>

                <Button
                  style={{
                    background: "#3A8040",
                    color: "white",
                    textTransform: "none",
                  }}
                >
                  Likes: {product.likes.length}
                </Button>

                <Button
                  style={{
                    background: "#3A8040",
                    color: "white",
                    textTransform: "none",
                  }}
                >
                  Comments {product.comments.length}
                </Button>
              </div>

              <Typography
                style={{ height: "44px" }}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                Brand: {product.ProductBrand}
                {"     "}
                Color: {product.ProductColor}
              </Typography>
              <Typography
                style={{ height: "44px" }}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {product.ProductDescription}
              </Typography>
            </div>
          </div>

          <Comment
            form={false}
            product={product}
            setProduct={setProduct}
            uid={uid}
          />
        </>
      )}
    </div>
  );
};

export default ProductDetails;
