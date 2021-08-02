import React from "react";
import "./PrimaryFooter.css";
import logo from "../NavBar/LOGO.png";

export default function primaryFooter() {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-display">
          <img src={logo} alt="logo" />
        </div>
        <div class="row">
          <div class="col-1">
            <h3>Customer Care</h3>
            <ul>
              <li>Contact Us</li>
              <li>Faq</li>
              <li>Returns and Exchanges</li>
              <li>Damaged and defected items</li>
            </ul>
          </div>
          <div class="col-2">
            <h3>My Account</h3>
            <ul>
              <li>Sign in/Register</li>
              <li>My cart</li>
            </ul>
          </div>
            <div class="col-3">
              <h3>Explore</h3>
              <ul>
                <li>Home</li>
                <li>Store</li>
                <li>Service</li>
              </ul>
            </div>
        </div>
        <div className="container-bottom">
          <div className="text-bottom">
            <p>copy rights 2021-ItWorkX-all Rights Reserved</p>
          </div>
          <div className="bottom-subs">
            <p>Subscribe To Our News Letters</p>
            <input type="text" name="subs" placeholder="example@gmail.com" />
            <button type="submit" className="button">
              {" "}
              Subscribe{" "}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
