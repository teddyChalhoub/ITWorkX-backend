import React, { useState } from "react";
import "./SignUp.css";
import SecondaryFooter from "../../components/secondaryFooter/SecondaryFooter";
import axios from "axios";
import { withRouter } from "react-router-dom";

const SignUp = (props) => {
  const [wrong, setWrong] = useState(false);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [nbEmployee, setNbEmployee] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [passwordAuth, setAuthPassword] = useState("");

  const handleLogin = async () => {
    try {
      const data = {
        name: fullName,
        email: email,
        password: password,
        company: companyName,
        nbofemployee: nbEmployee,
        country: country,
        address: address,
        notes: notes,
      };

      const response = await axios.post(
        "http://localhost:5000/user/register",
        data
      );

      if (!response.data.success) throw new Error(response.data.message);
      alert(response.data.message);
      props.history.push("/log-in");
    } catch (err) {
      alert(err.message);
    }
  };

  const checkPassword = () => {
    if (password !== passwordAuth) {
      setWrong(true);
    } else {
      handleLogin();
    }
  };

  return (
    <div className="sign_up">
      <form
        className="form-sign-up"
        onSubmit={(e) => {
          e.preventDefault();
          checkPassword();
        }}
      >
        <p>Sign Up </p>
        <div className="sing_in_inputs">
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            id="name"
            placeholder="Full name"
            required
          />
          <br />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            id="email"
            placeholder="Email"
            required
          />
          <br />
          <input
            className={wrong ? "border-red" : "border-normal"}
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            placeholder={wrong ? "Password doesn't match" : "Password"}
            required
          />
          <br />
          <input
            className={wrong ? "border-red" : "border-normal"}
            type="password"
            value={passwordAuth}
            onChange={(e) => {
              setAuthPassword(e.target.value);
            }}
            id="passwordAuth"
            placeholder="Re-enter password"
            required
          />
          <br />
          <input
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyName}
            type="text"
            id="Company"
            placeholder="Company name (optional)"
          />
          <br />
          <input
            onChange={(e) => setNbEmployee(e.target.value)}
            value={nbEmployee}
            type="number"
            id="employee"
            placeholder="Number of employee (optional)"
          />
          <br />
          <input
            onChange={(e) => setCountry(e.target.value)}
            value={country}
            type="country"
            id="Country"
            placeholder="Country"
            required
          />
          <br />
          <input
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            type="text"
            id="Adrress"
            placeholder="Adrress"
            required
          />
          <br />
          <div class="note">
            <input
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
              type="text"
              id="notes"
              placeholder="Notes"
            />
          </div>
          <div className="signup_checkbox">
            <input type="checkbox" id="subs" name="subs" value="subs" />
            <label className="subs-check" for="Subs">
              Subscribe
            </label>
          </div>
        </div>
        <button className="button">Sign Up </button>
      </form>
      <SecondaryFooter />
    </div>
  );
};
export default withRouter(SignUp);
