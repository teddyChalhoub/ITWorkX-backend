import React from "react";
import "./HardwareSolution.css";
import { Link } from "react-router-dom";

const HardwareSolution = () => {
  return (
    <div className="app__HardwareSolution">
      <div className="app__HardwareSolution--img">
        <img src="https://learn.g2.com/hubfs/hardware-vs-software.jpg" />
      </div>
      <div className="app__HardwareSolution--info">
        <h3 className="HardwareSolution">IT and Hardware Solution</h3>
        <p className="app__HardwareSolution__paragraph">
          Are your searching for hardwares? Go check out our store where you can
          find a wide range of hardwares, like CPU, Laptops parts,etc. Check out
          our Store and find what you need.{" "}
        </p>
        <div className="app__btn__shop">
          <Link to="/store">
            <button className="btn__shop" type="submit">
              CLICK HERE TO SHOP
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HardwareSolution;
