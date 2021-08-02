import React, { useEffect, useState } from "react";
import "./cart.css";

const Cart = (props) => {
 
  return (
    <div className="cart_wrapper">
      <div className="cart__product__info--img">
        <img
          src="https://i.pinimg.com/originals/83/64/66/83646654668bf9ae412f45bb2e417ddf.jpg"
          alt=""
        />
        <div className="cart__product--product_details">
          <p>{props.productTitle}</p>
          <p>$ {props.productPrice}</p>
        </div>
      </div>
      <div className="cart__product__info--details">
        <div className="cart__product__info--quantity">
          <p>{props.orderQuantity}</p>
        </div>
        <div className="cart__product__info--price">
          <p>$ {props.orderTotalPrice}</p>
        </div>
        <div className="cart__product__info--quit">
          <a onClick={() => props.handleProductId(props.productId)}>x</a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
