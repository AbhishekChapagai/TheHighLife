import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Home from "./components/home/Home";
import AppTop from "./components/AppTop";
import AppNav from "./components/AppNav";

import NotFound from "./components/NotFound";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/auth/Login";
import { useState } from "react";
import Register from "./components/auth/Register";
import SellerLogin from "./components/auth/SellerLogin";
import SellerRegister from "./components/auth/SellerRegister";
import PrivateSeller from "./private/PrivateSeller";
import SellerHome from "./components/seller/SellerHome";
import Product from "./components/seller/product/Product";
import Profile from "./components/seller/Profile/Profile";
import { Link, Typography } from "@material-ui/core";
import AdminLogin from "./components/auth/AdminLogin";

import SellerNav from "./components/seller/SellerNav";
import Seller from "./components/admin/Seller";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="app">
      <Router history={history}>
        <Switch>
          {/* ------------Buyer */}
          <Route path="/" exact>
              <AppTop />
              <AppNav />
              <Home isLogged={isLogged} setIsLogged={setIsLogged} />
          </Route>
          <Route path="/product/:id">
            <AppTop />
            <AppNav />
            <ProductDetails />
          </Route>
          <Route path="/login" exact>
            <AppTop />
            <AppNav />
            <Login isLogged={isLogged} setIsLogged={setIsLogged} />
          </Route>
          <Route path="/register" exact>
            <AppTop />
            <AppNav />
            <Register />
          </Route>

          {/* --------------Seller */}
          <Route path="/seller/login" exact>
            <AppTop />
            <AppNav />
            <SellerLogin />
          </Route>
          <Route path="/seller/register" exact>
            <AppTop />
            <AppNav />
            <SellerRegister />
          </Route>
          <PrivateSeller exact path="/seller/home">
            <SellerHome />
          </PrivateSeller>
          <PrivateSeller exact path="/seller/product">
            <Product />
          </PrivateSeller>
          <PrivateSeller exact path="/seller/profile">
            <Profile />
          </PrivateSeller>

          {/* ------------------Admin */}
          <Route path="/admin/login" exact>
            <AppTop />
            <AdminLogin />
          </Route>
          <PrivateSeller exact path="/seller/users/verify">
            <AppTop />
            <SellerNav />
            <Seller />
          </PrivateSeller>

          <Route>
            <AppTop />
            <AppNav />
            <NotFound />
          </Route>
        </Switch>

        <div style={{ background: "white", height: "50px", marginTop: "25px" }}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="localhost:3000">
              The High Life
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </div>
      </Router>
    </div>
  );
}

export default App;
