import React from "react";
import "../Slider2.css";
import leftArrow from "./icons/left-arrow.png";
import rightArrow from "./icons/right-arrow.png";

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide2 next2" : "btn-slide2 prev2"}
    >
      <img src={direction === "next" ? rightArrow : leftArrow} />
    </button>
  );
}
