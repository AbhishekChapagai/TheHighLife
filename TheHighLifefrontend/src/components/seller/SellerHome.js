import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axoisInstance from "../../utils/sellerAxois";
import AppTop from "../AppTop";
import AddCategory from "./category/AddCategory";
import CategoryTable from "./category/CategoryTable";
import SellerNav from "./SellerNav";

const SellerHome = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (
      localStorage.getItem("JWTSeller") === undefined ||
      !localStorage.getItem("JWTSeller")
    ) {
      history.push("/");
    }
  }, [history]);

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

  return (
    <div>
      <AppTop />
      <SellerNav />
      <AddCategory setCategories={setCategories} />
      <CategoryTable categories={categories} setCategories={setCategories} />
    </div>
  );
};

export default SellerHome;
