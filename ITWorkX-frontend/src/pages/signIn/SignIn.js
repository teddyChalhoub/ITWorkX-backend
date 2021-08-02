import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./SignIn.css";
import SecondaryFooter from "../../components/secondaryFooter/SecondaryFooter";
import axios from "axios";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://localhost:5000/user/login",
        data
      );
      console.log(response);
      if (!response.data.success) throw new Error(response.data.message);

      localStorage.setItem("token", response.data.authToken);
      props.history.push("/store");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEmailValue = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordValue = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="sign_in">
        <form
          onSubmit={handleLogin}
          className="form-sign-in"
        >
          <div className="mid-center">
            <h1>Sign In </h1>
            <div className="sing_in_inputs">
              <label for="email" className="label">
                Email
              </label>
              <br />
              <input
                type="text"
                id="email"
                placeholder="Email"
                onChange={handleEmailValue}
                value={email}
                required
              />
              <br />
              <label for="password" className="label">
                Password
              </label>
              <br />
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={handlePasswordValue}
                value={password}
                required
              />
              <br />
            </div>
            <button className="sign-in-btn">Sign In</button>
            <p>Not a member yet ?</p>
            <Link to="/sign-up">
              <p>Sign Up</p>
            </Link>
          </div>
        </form>
      </div>
      <SecondaryFooter />
    </>
  );
};

export default withRouter(SignIn);
