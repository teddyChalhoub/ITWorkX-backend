import { Link } from "react-router-dom";
import React from "react";
import "./SignIn.css";

const SignIn = () => {
  return (
    <div className="app__sign-in-out">
      <Link to="/log-in">
        <button className="btn" type="submit">
          Sign Up
        </button>
      </Link>
      <Link to="/sign-up">
        <button className="btn" type="submit">
          Sign In
        </button>
      </Link>
    </div>
  );
};

export default SignIn;
