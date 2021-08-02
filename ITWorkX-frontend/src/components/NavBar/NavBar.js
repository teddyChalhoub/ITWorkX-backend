import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./Navbar.css";
import logo from "./LOGO.png";
import { CountContext } from "../../utils/countContext";

function NavBar({ numberOfItemsInCart, fetchSearchValue, searchValue }) {
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  const handleMouseEnter = (e) => {
    e.preventDefault();
    setVisible(true);
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    setVisible(false);
  };

  const handleInputData = (e) => {
    fetchSearchValue(e.target.value);
  };

  const handleSignOutBtn = () => {
    localStorage.removeItem("token");
  };

  const handleCartNav = () => {
    alert("Only logged in are allowed");
  };

  const { nbOrder, setNbOrder } = useContext(CountContext);

  return (
    <div>
      <header>
        <div className="app__navbar">
          <div className="app__navbar__img">
            <img className="logo" src={logo} alt="logo" />
            <input
              className="app__navbar__input"
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={handleInputData}
            />
          </div>
          <div className="navbar__menu">
            <Link className="home links" to="/">
              Home{" "}
            </Link>
            <Link className="store links" to="/store">
              Store{" "}
            </Link>
            <Link className="contact-us links" to="/contact-us">
              Contact us{" "}
            </Link>
            <Link className="services links" to="/services">
              Services
            </Link>
            <Link className="about-us links" to="/about-us">
              About us{" "}
            </Link>
            {localStorage.getItem("token") === null ? (
              <Link
                onClick={handleCartNav}
              >
                <Badge color="secondary" className="cart__icon">
                  <ShoppingCartIcon
                    style={{ fill: "white" }}
                    fontSize="large"
                  />
                </Badge>
              </Link>
            ) : (
              <Link to="/cart">
                <Badge
                  badgeContent={nbOrder} //TO ADD the number of items in cart
                  color="secondary"
                  className="cart__icon"
                >
                  <ShoppingCartIcon
                    style={{ fill: "white" }}
                    fontSize="large"
                  />
                </Badge>
              </Link>
            )}

            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="app__user__icon"
            >
              <Link>
                <AccountCircleIcon
                  className="user__icon"
                  style={{ fill: "white" }}
                  fontSize="large"
                />
              </Link>
              <div className="app__user__log-in">
                {console.log(localStorage.getItem("token") === null)}
                {localStorage.getItem("token") === null ? (
                  <>
                    <Link
                      className="app__log-in"
                      style={{ display: visible ? "block" : "none" }}
                      to="/log-in"
                    >
                      Log In
                    </Link>

                    <Link
                      className="app__sign-up"
                      style={{ display: visible ? "block" : "none" }}
                      to="/sign-up"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <Link
                    onClick={handleSignOutBtn}
                    style={{ display: visible ? "block" : "none" }}
                    to="/"
                  >
                    Sign Out
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBar;
