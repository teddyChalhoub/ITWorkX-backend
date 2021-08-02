import React, { useEffect, useState } from "react";
import "./cardQuantity.css";

const CardQuantity = (props) => {
  let [count, setCount] = useState(1);

  const minusQuantity = (e) => {
    e.preventDefault();
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addQuantity = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };

  useEffect(() => {
    props.fetchQuantity(count);
  }, [count]);

  return (
    <>
      <div className="quantity flex">
        <button onClick={minusQuantity} className="minus">
          -
        </button>
        <span className="border__quantity--count">{count}</span>
        <button onClick={addQuantity} className="plus">
          +
        </button>
      </div>
    </>
  );
};

export default CardQuantity;
