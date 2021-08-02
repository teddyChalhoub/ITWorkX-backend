import React from "react";
import Slider from "../../components/Slider/Slider";
import AboutBusiness from "../../components/AboutBusiness/AboutBusiness";
import DigitalSolution from "../../components/DigitalSolution/DigitalSolution";
import SignIn from "../../components/LoginButtons/SignIn";
import HardwareSolution from "../../components/hardwareSolution/HardwareSolution";
import PrimaryFooter from "../../components/primaryFooter/PrimaryFooter";
import "./Home.css";

const Home = () => {
  return (
    <div className="home__container">
      <Slider />
      <div className="home__about_business">
        <AboutBusiness />
      </div>
      <DigitalSolution />
      <div className="home__hardware-solution">
        <HardwareSolution />
      </div>
      <PrimaryFooter />
    </div>
  );
};

export default Home;
