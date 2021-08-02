import React, { useContext, useEffect, useState } from "react";
import CardQuantity from "../cardQuantity/cardQuantity";
import { Link, Redirect } from "react-router-dom";
import "./ItemDisplay.css";
import { withRouter, useParams } from "react-router-dom";
import useFetch from "../../utils/useFetch.js";
import ProductImages from "../productImages/productImages";
import axios from "axios";
import { CountContext } from "../../utils/countContext";

const ItemDisplay = () => {
  const [images, setImages] = useState();
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);

  const { nbOrder, setNbOrder } = useContext(CountContext);

  const { title } = useParams();

  const fetchQuantity = (value) => {
    setQuantity(value);
  };

  const {
    loading,
    data: product,
    message,
    error,
  } = useFetch(`http://localhost:5000/product/${title}`);

  useEffect(() => {
    setImages(product.images);
  }, [product]);

  const handleAddToCart = async (isBuy) => {
    try {
      const data = {
        product_id: productId,
        quantity: quantity,
        totalPrice: totalPrice,
      };

      setRedirect(false);
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

      if (isBuy) {
        setRedirect(true);
      }
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

  const handleTotalPrice = () => {
    if (parseInt(product.discount) !== undefined) {
      setTotalPrice(
        parseInt(product.price) * quantity -
          parseInt(product.price) *
            (parseInt(product.discount) / 100) *
            quantity
      );
    } else {
      setTotalPrice(product.price * quantity);
    }
  };

  useEffect(() => {
    if (product) {
      setProductId(product._id);
      handleTotalPrice();
    }
  }, [product, quantity]);

  return (
    <>
      {loading ? (
        <div>loading..</div>
      ) : error ? (
        <div>{message}</div>
      ) : redirect ? (
        <Redirect to="/cart" />
      ) : (
        <>
          <div className="item__details">
            <ProductImages images={images} />

            <div className="item__details-title-card">
              <p>{product && product.title}</p>
              <p>{product && product.subTitle}</p>

              <div className="item__details-card">
                <div className="item__details-padding-price-to-totalPrice">
                  <div className="item__details-card-price">
                    <p>Price</p>
                    <p>{product && product.price}$</p>
                  </div>
                  <div className="item__details-card-quantity">
                    <CardQuantity
                      fetchQuantity={fetchQuantity}
                      isItemDisplay={true}
                    />
                  </div>

                  {product && product.discount === undefined ? (
                    <div className="item__details-card-total-price">
                      <p>Total Price</p>
                      <p>{parseInt(product.price) * quantity}$</p>
                    </div>
                  ) : (
                    <>
                      <div className="item__details-card-discount">
                        <p>Discount</p>
                        <p>{product.discount}%</p>
                      </div>
                      <div className="item__details-card-total-price">
                        <p>Total Price</p>
                        <p>
                          {parseInt(product.price) * quantity -
                            parseInt(product.price) *
                              (parseInt(product.discount) / 100) *
                              quantity}
                          $
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="item__details-card--buttons">
                  <button onClick={() => handleAddToCart(false)}>
                    Add to cart
                  </button>
                  <button onClick={() => handleAddToCart(true)}>Buy now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="item__description">
            <p>{product && product.description}</p>
          </div>
        </>
      )}
    </>
  );
};

export default withRouter(ItemDisplay);
