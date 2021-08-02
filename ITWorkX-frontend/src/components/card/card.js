import React, { useContext, useEffect, useState } from "react";
import CardQuantity from "../cardQuantity/cardQuantity";
import "./card.css";
import newIcon from "./icons/new.png";
import { CountContext } from "../../utils/countContext";
import axios from "axios";

const Card = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const { nbOrder, setNbOrder } = useContext(CountContext);

  const handleAddToCart = async () => {
    const data = {
      product_id: productId,
      quantity: quantity,
      totalPrice: totalPrice,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/orderItem/add",
        data,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (!response.data.success)
        throw new Error("Only Logged in user are allowed");
      localStorage.setItem(
        "nbOrders",
        parseInt(localStorage.getItem("nbOrders")) + 1
      );
      setNbOrder(localStorage.getItem("nbOrders"));
      alert("added to cart successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchQuantity = (value) => {
    setQuantity(value);
  };

  const handleTotalPrice = () => {
    if (parseInt(props.discount) > 0) {
      setTotalPrice(props.price * (parseInt(props.discount) / 100) * quantity);
    } else {
      setTotalPrice(props.price * quantity);
    }
  };

  useEffect(() => {
    setProductId(props.product_id);
    handleTotalPrice();
  }, [quantity]);

  return (
    <div className="card__wrapper">
      <div className="container__image">
        {props.image ? (
          <img
            onClick={() => {
              window.open(`/store/${props.title}`);
            }}
            src={`http://localhost:5000${props.image}`}
            alt=""
          />
        ) : (
          <img
            onClick={() => {
              window.open(`/store/${props.title}`);
            }}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
            alt=""
          />
        )}
      </div>
      <div>
        <p>{props.title}</p>
        <div className="border__quantity__btn--card flex">
          <div className="center__price_quantity">
            <p>{props.price}$/Piece</p>

            <CardQuantity fetchQuantity={fetchQuantity} />
          </div>
          <input
            type="button"
            className="button__add-to-card"
            value="Add to cart"
            onClick={handleAddToCart}
          />
        </div>
      </div>
      {props.newItem ? (
        <img className="card__new__icon" src={newIcon} alt="New Icon" />
      ) : null}
    </div>
  );
};

export default Card;
