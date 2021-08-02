import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading_container">
      <div className="load">
        {Array.from({ length: 20 }).map((item, index) => {
          return <span style={{ "--i": index + 1 }}></span>;
        })}
      </div>
    </div>
  );
};

export default Loading;
