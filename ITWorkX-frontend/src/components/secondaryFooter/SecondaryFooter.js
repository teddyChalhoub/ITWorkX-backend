import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGooglePlusG,
} from "react-icons/fa";
import "./SecondaryFooter.css";

export default function secondaryFooter() {
  return (
    <div className="footer-content">
      <div className="footer-content-message">
        <h3>Get connected with us on socia media !</h3>
      </div>
      <div className="socials">
        <a href="https://www.facebook.com/">
          <FaFacebook className="fa-icon-color" />
        </a>

        <a href="https://www.instagram.com/">
          <FaInstagram className="fa-icon-color" />
        </a>

        <a href="https://www.twitter.com/">
          <FaTwitter className="fa-icon-color" />
        </a>

        <a href="https://www.google.com/gmail/">
          <FaGooglePlusG className="fa-icon-color" />
        </a>
      </div>
    </div>
  );
}
