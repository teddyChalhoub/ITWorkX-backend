import React from "react";
import logoo from "./logoo.png";
import "./TeamSection.css";

export default function teamSection() {
  return (
    <div>
      <div className="team">
        <div className="img-display">
          <img src={logoo} alt="logoo" />
        </div>
        <div className="team-info">
          <h2>Name Here</h2>
          <h1>position</h1>
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ac
            elementum ipsum. Ut ut neque purus. Duis congue, neque eget finibus
            molestie, justo ipsum
          </p>
        </div>
      </div>
    </div>
  );
}
