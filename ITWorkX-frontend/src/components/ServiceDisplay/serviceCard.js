import React from "react";
import "../../pages/service/service-page.css";

const ServiceDisplay2 = (props) => {
  console.log(props);
  return (
    <div className="services__cards--content">
      {props.second ? (
        <div
          className="main"
          onClick={() =>
            props.handleVisibilityAndData(true, props.response)
          }
        >
          <div className="card_details_flex">
            <h1 className="text-center">{props.response.title}</h1>
            <h3 className="text-center">{props.response.price}</h3>
            <p className="text-center">{props.response.description}</p>
          </div>
          <div className="card_image_flex">
            <img
              className="services__img img1 right"
              src={`http://localhost:5000/${props.response.imageUrl[0].url}`}
            ></img>
          </div>
        </div>
      ) : (
        <div
          className="main"
          onClick={() =>
            props.handleVisibilityAndData(true, props.response)
          }
        >
          <div className="card_image_flex">
            <img
              className="services__img img1 left"
              src={`http://localhost:5000/${props.response.imageUrl[0].url}`}
            ></img>
          </div>
          <div className="card_details_flex">
            <h1 className="text-center">{props.response.title}</h1>
            <h3 className="text-center">{props.response.price}</h3>
            <p className="text-center">{props.response.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ServiceDisplay2;
