import React, { useEffect, useState } from "react";
import "./productImages.css";

const ProductImages = (props) => {
  const [image, setImage] = useState();

  useEffect(() => {
    if (props.images.length > 0) {
      console.log({ imageProp: props.images });
      setImage(props.images[0].url);
    } else {
      setImage(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
      );
    }
  }, []);

  return (
    <div className="item__image__container">
      <div
        className={
          props.images.length === 0
            ? "item__details--img_placeholder"
            : "item__details--img"
        }
      >
        {props.images.length === 0 ? (
          <img src={`${image}`} />
        ) : (
          <img src={`http://localhost:5000${image}`} />
        )}
      </div>
      <div className="item__gallery__img">
        {props.images &&
          props.images.map((img, index) => {
            return (
              <img
                className={
                  image === img.url ? "item__gallery__img--active" : ""
                }
                key={index}
                src={`http://localhost:5000${img.url}`}
                alt={`image_${index}`}
                onClick={() => setImage(img.url)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ProductImages;
