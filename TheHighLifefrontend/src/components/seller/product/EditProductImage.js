import { Button } from "@material-ui/core";
import bsCustomFileInput from "bs-custom-file-input";
import React, { useEffect, useRef, useState } from "react";
import axoisInstance, { API_URL, headers } from "../../../utils/sellerAxois";

const EditProductImage = ({ setProduct, eid }) => {
  const [productImage, setProductImage] = useState("");
  const [file, setFile] = useState(null);
  const imgRef = useRef(null);
  const [error, setError] = useState("");

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const updateImage = () => {
    const formData = new FormData();
    formData.append("pimage", file);
    axoisInstance
      .put(`/product/update/image/${eid}`, formData, {
        headers: headers,
      })
      .then((res) => {
        setError("Image update successfully");
        setFile(null);
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
        setError(err.response.data.message);
      });
  };

  useEffect(() => {
    axoisInstance
      .get(`/product/single/${eid}`)
      .then((response) => {
        console.log(response.data);
        setProductImage(response.data.ProductImage);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [eid]);

  return (
    <div>
      <p align="center" style={{ color: "red" }}>
        {error}
      </p>
      <img
        src={`${API_URL}/image/${productImage}`}
        height="200"
        width="200"
        style={{ objectFit: "contain" }}
        alt={productImage}
      />

      <div className="custom-file">
        <input
          id="inputGroupFile01"
          type="file"
          className="custom-file-input"
          onChange={handleFileSelect}
          ref={imgRef}
        />
      </div>
      <br />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        style={{ background: "#3A8057", textTransform: "none" }}
        disabled={!file}
        onClick={updateImage}
      >
        Edit
      </Button>
    </div>
  );
};

export default EditProductImage;
