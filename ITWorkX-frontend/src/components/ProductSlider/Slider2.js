import React, { useEffect, useRef, useState } from "react";
import "./Slider2.css";
import BtnSlider from "./ButtonsSlider/BtnSlider";

export default function Slider(props) {

  const [slideIndex, setSlideIndex] = useState(1);
  const [dataSlider, setDataSlider] = useState([]);

  const timeOutRef = useRef(null);

  const resetTimeout = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }
  };

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  useEffect(() => {
    resetTimeout();
    timeOutRef.current = setTimeout(() => {
      setSlideIndex((prevIndex) =>
        prevIndex === dataSlider.length ? 1 : prevIndex + 1
      );
    }, 2500);

    return () => {
      resetTimeout();
    };
  }, [slideIndex]);

  useEffect(() => {
    setDataSlider(props.images);
  });

  return (
    <div className="container-slider2">
      {dataSlider &&
        dataSlider.map((obj, index) => {

          return (
            <div
              key={obj.id}
              className={
                slideIndex === index + 1 ? "slide2 active-anim2" : "slide2"
              }
            >
              <img src={`http://localhost:5000${obj.url}`} />
            </div>
          );
        })}

      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className="container-dots2">
        {Array.from({ length: dataSlider.length }).map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot2 active2" : "dot2"}
          ></div>
        ))}
      </div>
    </div>
  );
}
