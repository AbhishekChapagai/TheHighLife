import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axoisInstance, { headers } from "../../../utils/sellerAxois";
import AppTop from "../../AppTop";
import ProductTable from "../product/ProductTable";
import SellerNav from "../SellerNav";
import CloseIcon from "@material-ui/icons/Close";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    background: "#F7F8F9",
    marginRight: "10%",
    marginLeft: "10%",
    marginTop: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: "5px",
  },

  profileDetails: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginLeft: "5%",
  },
  profileActions: {
    display: "flex",
    flexDirection: "column",
    marginRight: "2%",
  },
}));

const Profile = () => {
  const classes = useStyles();
  // const [user, setUser] = useState({});
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [product, setProduct] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openImage, setOpenImage] = React.useState(false);
  const [uid, setUid] = useState("");

  const handleClickOpenImage = (id) => {
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };

  const handleClickOpen = (id) => {
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
      .then((user) => {
        // console.log(user.data);
        // setUser(user?.data);
        setFullname(user?.data?.fullname);
        setEmail(user?.data?.email);
        setPhoneNumber(user?.data?.phoneNumber);
        setAddress(user?.data?.address);
        setUid(user?.data?._id);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  }, []);

  useEffect(() => {
    axoisInstance
      .get("/product/seller/showall", {
        headers: headers,
      })
      .then((res) => {
        setProduct(res?.data);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  }, []);

  return (
    <div>
      <AppTop />
      <SellerNav />

      <div className={classes.profileContainer}>
        <div>
          <div className={classes.profileDetails}>
            <Typography>{fullname}</Typography>
            <Typography>{email}</Typography>
            <Typography>{phoneNumber}</Typography>
            <Typography>{address}</Typography>

            <Typography>
              {product.length} {product.length > 1 ? "Products" : "Product"}
            </Typography>
          </div>
        </div>
        <div className={classes.profileActions}>
          <Button onClick={handleClickOpen}>Edit Profile</Button>

          <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
              <div style={{ display: "flex" }}>
                <div>Edit Profile</div>
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
              <EditProfile
                fullname={fullname}
                setFullname={setFullname}
                email={email}
                setEmail={setEmail}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                address={address}
                setAddress={setAddress}
                uid={uid}
              />
            </DialogContent>
          </Dialog>

          <br />
          <Button onClick={handleClickOpenImage}>
            {" "}
            <EditPassword />
          </Button>

          <Dialog
            onClose={handleCloseImage}
            aria-labelledby="customized-dialog-title"
            open={openImage}
          >
            <DialogTitle
              id="customized-dialog-title"
              onClose={handleCloseImage}
            >
              <div style={{ display: "flex" }}>
                <div>Edit password</div>
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
                  onClick={handleCloseImage}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </DialogTitle>
            <DialogContent dividers>Edit Password</DialogContent>
          </Dialog>
        </div>
      </div>
      <br />
      {product.length > 0 && (
        <ProductTable
          action={false}
          product={product}
          setProduct={setProduct}
        />
      )}
    </div>
  );
};

export default Profile;
