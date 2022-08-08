import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import React from "react";
import CommentIcon from "@material-ui/icons/ChatBubbleOutline";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShopIcon from "@material-ui/icons/Shop";
import axoisInstance, { API_URL, headers } from "../../utils/axois";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "auto",
    minWidth: 250,
    marginLeft: "2%",
    marginTop: "2%",
    marginBottom: "2%",
    borderRadius: "10px",
    "&:hover": {
      boxShadow: "0 4px 8px 0 rgba(39, 91, 235, 0.2),0 6px 20px 0 #3A8040",
    },
  },

  media: {
    height: 140,
    "&:hover": {
      opacity: "0.8",
    },
  },
  VisitListButton: {
    color: "white",
    backgroundColor: "#3A8040",
    textTransform: "none",
    borderRadius: "6px",
    paddingRight: "20px",
    paddingLeft: "20px",
    "&:hover": {
      backgroundColor: "#f2f2f2",
      boxShadow:
        "0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)",
      color: "black",
    },
  },
  placeReview: {
    display: "flex",
    alignItems: "center",
    borderRight: "2px solid #3A8040",
    height: "40px",
    paddingRight: "5px",
  },
  placeDistance: {
    borderRight: "2px solid #3A8040",
    height: "40px",
  },
}));

const Product = ({ product, uid, setProduct }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const like = (id) => {
    const obj = {
      productId: id,
      userId: uid,
    };
    axoisInstance
      .put("product/like", obj, {
        headers: headers,
      })
      .then((res) => {
        axoisInstance
          .get("/product/showall")
          .then((res) => {
            setProduct(res.data);
          })
          .catch((err) => {
            console.log(err);
            // alert(err.response?.data?.message);
          });
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  };

  const unlike = (id) => {
    const obj = {
      productId: id,
      userId: uid,
    };
    axoisInstance
      .put("product/unlike", obj, {
        headers: headers,
      })
      .then((res) => {
        axoisInstance
          .get("/product/showall")
          .then((res) => {
            setProduct(res.data);
          })
          .catch((err) => {
            console.log(err);
            // alert(err.response?.data?.message);
          });
      })
      .catch((err) => {
        console.log(err.response?.data?.message);
      });
  };

  const buyProduct = (id) => {
    const obj = {
      id: id,
      ProductSold: 1,
    };
    axoisInstance
      .put("product/sell", obj)
      .then((res) => {
        setTimeout(() => {
          axoisInstance.get("/product/showall").then((res) => {
            setProduct(res.data);
            alert("Product sold successfully");
          });
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/product/${product._id}`}>
        <CardMedia
          className={classes.media}
          image={`${API_URL}/image/${product.ProductImage}`}
          title={product.ProductName}
        />
      </CardActionArea>

      <CardContent style={{ paddingTop: "1px" }}>
        <Typography gutterBottom={false}>
          {product.ProductName.substring(0, 25)}
          {product.ProductName.length > 50 && "..."}
        </Typography>
        <Typography gutterBottom={false} variant="h6" component="h6">
          Rs {product.ProductPrice}
        </Typography>

        <Typography
          style={{ height: "44px" }}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {product.ProductDescription.substring(0, 80)}
          {product.ProductDescription.length > 80 && <label>...</label>}
        </Typography>
      </CardContent>
      <CardActions>
        <div className={classes.placeReview}>
          <Tooltip title="Comment">
            <IconButton
              disabled={
                localStorage.getItem("JWTUSER") === undefined ||
                !localStorage.getItem("JWTUSER")
              }
              onClick={handleClickOpen}
            >
              <CommentIcon style={{ color: "#B1B3A2" }} />
            </IconButton>
          </Tooltip>
          <span>{product.comments.length}</span>

          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              <div style={{ display: "flex" }}>
                <div>Comment on {product.ProductName}</div>
                <div
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ></div>
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent dividers>
              <Comment
                form={true}
                product={product}
                setProduct={setProduct}
                uid={uid}
              />
            </DialogContent>
          </Dialog>
        </div>
        <div className={classes.placeDistance}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingRight: "5px",
            }}
          >
            {product.likes.includes(uid) ? (
              <Tooltip title="Unlike">
                <IconButton
                  disabled={
                    localStorage.getItem("JWTUSER") === undefined ||
                    !localStorage.getItem("JWTUSER")
                  }
                  style={{ color: "#3A8040" }}
                  onClick={() => unlike(product._id)}
                >
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Like">
                <IconButton
                  disabled={
                    localStorage.getItem("JWTUSER") === undefined ||
                    !localStorage.getItem("JWTUSER")
                  }
                  onClick={() => like(product._id)}
                >
                  <ThumbUpIcon style={{ color: "#B1B3A2" }} />
                </IconButton>
              </Tooltip>
            )}

            <span>{product.likes.length}</span>
          </div>
        </div>

        <Tooltip
          title={
            product.ProductSold === 1
              ? "Cannot buy already sold"
              : "Buy Product"
          }
        >
          <Button
            disabled={
              product.ProductSold === 1 ||
              localStorage.getItem("JWTUSER") === undefined ||
              !localStorage.getItem("JWTUSER")
            }
            className={classes.VisitListButton}
            onClick={() => buyProduct(product._id)}
          >
            <ShopIcon />
            {product.ProductSold === 1 ? "Sold" : "Purchase"}
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default Product;
