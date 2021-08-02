import { PinDropSharp } from "@material-ui/icons";
import React from "react";
import { withRouter } from "react-router-dom";
import "./DigitalSolution.css";

const DigitalSolution = (props) => {
  const handleNavigation = () => {
    props.history.push("/services");
  };

  return (
    <div className="digital-solution__container">
      <h1 className="app__digital-solution">Digital Solutions</h1>
      <section id="pricing">
        <div className="product" id="solo">
          <img
            src="https://www.thesoftwarereport.com/wp-content/uploads/2020/08/Tech-company-IPO.jpg"
            className="image"
          />
          <div className="product__details">
            <h3>Software Development</h3>
            <div className="product__details--content">
              <ul>
                <li>Web application</li>
                <li>Mobile apps</li>
                <li>Cloud applications</li>
                <li>Desktop applications</li>
              </ul>
            </div>
            <button onClick={handleNavigation} className="btn">
              Take a tour
            </button>
          </div>
        </div>
        <div className="product" id="group">
          <img
            src="https://i.pinimg.com/originals/5a/96/ee/5a96ee0f7be140a5649d1b2c2f3af320.png"
            className="image"
          />
          <div className="product__details">
            <h3>Web Designing UX UI</h3>
            <div className="product__details--content">
              <ul>
                <li>Client-focused</li>
                <li>customer-centric</li>
                <li>
                  creating website solutions that deliver tangible business
                  results
                </li>
                <li>
                  Appnovation's web developers helps brands the ever-changing
                  digital landscape.
                </li>
              </ul>
            </div>
            <button onClick={handleNavigation} className="btn">
              Take a tour
            </button>
          </div>
        </div>
        <div className="product" id="kids">
          <img
            src="https://www.handelskraft.com/wp-content/uploads/sites/2/2021/06/digital_marketing.jpg"
            className="image"
          />
          <div className="product__details">
            <h3>Digital Marketing</h3>
            <ul>
              <li>Client-focused</li>
              <li>customer-centric</li>
              <li>
                creating website solutions that deliver tangible business
                results
              </li>
              <li>
                Appnovation's web developers helps brands the ever-changing
                digital landscape.
              </li>
            </ul>
            <button onClick={handleNavigation} className="btn">
              Take a tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default withRouter(DigitalSolution);
