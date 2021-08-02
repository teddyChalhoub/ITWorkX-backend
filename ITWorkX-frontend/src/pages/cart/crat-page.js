import React, { useContext, useEffect, useState } from "react";
import "./cart-page.css";
import Cart from "../../components/cart/cart";
import Loading from "../../components/loading/loading";
import PrimaryFooter from "../../components/primaryFooter/PrimaryFooter";
import axios from "axios";
import { CountContext } from "../../utils/countContext";

const CartPage = () => {
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, isLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, isError] = useState(false);
  const [subTotal, setSubtotal] = useState(0);
  const [delivery, setDelivery] = useState(10);

  const { nbOrder, setNbOrder } = useContext(CountContext);

  const handleProductId = (value) => {
    handleDelete(value);
  };

  const handleDelete = async (value) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/orderItem/delete/${value}`,
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      if (!response.data.success) throw new Error(response.data.message);
      localStorage.setItem(
        "nbOrders",
        parseInt(localStorage.getItem("nbOrders")) - 1
      );
      setNbOrder(localStorage.getItem("nbOrders"));
      setCount(count + 1);
      alert("deleted from cart successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDisplayData = async () => {
    setMessage("");
    isLoading(true);
    isError(false);
    setProducts([]);
    try {
      const response = await axios.get("http://localhost:5000/order", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.data.success) throw new Error(response.data.message);
      setMessage("");
      isLoading(false);
      isError(false);
      setProducts(response.data.data);
    } catch (err) {
      setProducts([]);
      setMessage(err.message);
      isLoading(false);
      isError(true);
      alert(err.message);
    }
  };

  const handleTotalPrice = () => {
    let priceSum = 0;
    if (products && products.orderItem !== undefined) {
      products.orderItem.map((orderItem) => {
        priceSum = priceSum + orderItem.totalPrice;
      });
      setSubtotal(priceSum);
    }
  };

  useEffect(() => {
    handleDisplayData();
    handleTotalPrice();
  }, [count]);

  useEffect(() => {
    handleTotalPrice();
  }, [products]);

  return (
    <>
      <div className="cart__container">
        <div className="cart__container__product__details">
          <p>My Cart</p>
          <div className="cart__titles">
            <p>Product</p>
            <p>Quantity</p>
            <p>Price</p>
            <p></p>
          </div>
          {loading ? (
            <Loading />
          ) : error ? (
            <div>{message}</div>
          ) : (
            products &&
            products.orderItem &&
            products.orderItem.map((cart) => {
              return (
                cart.products && (
                  <Cart
                    handleProductId={handleProductId}
                    productId={cart._id}
                    productTitle={cart.products.title}
                    productPrice={cart.products.price}
                    orderQuantity={cart.quantity}
                    orderTotalPrice={cart.totalPrice}
                  />
                )
              );
            })
          )}
        </div>
        <div className="cart__container__payment">
          <p>Price Details</p>
          <div className="cart__container__payment--subTotal">
            <p>Subtotal</p>
            <p>{subTotal} $</p>
          </div>
          <div className="cart__container__payment--delivery">
            <p>Delivery</p>
            <p>{delivery} $</p>
          </div>
          <div className="cart__container__payment--orderTotal">
            <p>Total</p>
            <p>{subTotal + delivery}$</p>
          </div>
          <button className="cart__container__btn">Place Order</button>

          <div className="cart__payment__method--cash">
            <p>Payment Method</p>
            <label className="payment" for="cash">
              Cash on delivery
              <input type="radio" id="cash" name="payment" />
              <span className="checkmark"></span>
            </label>

            <label className="payment" for="omt">
              OMT
              <input type="radio" id="omt" name="payment" />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
      </div>
      <PrimaryFooter />
    </>
  );
};

export default CartPage;
