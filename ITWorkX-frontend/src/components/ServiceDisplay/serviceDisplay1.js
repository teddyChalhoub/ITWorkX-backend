import { render } from "@testing-library/react";
import React from "react";
import "./serviceDisplay.css";

const ServiceDisplay = (props) => {
  console.log("itemDisplay", props);

  return (
    <div className="item_details">
      <img
        className="item_details-img"
        src={`http://localhost:5000/${props.service.imageUrl[0].url}`}
      />
      <h1 className="title">{props.service.title}</h1>
      <h3 className="pricell">{props.service.price}</h3>
      <div className="desc">
        <p>{props.service.description}</p>
      </div>
      <div className="item_details-title"></div>
    </div>
  );
};
export default ServiceDisplay;
