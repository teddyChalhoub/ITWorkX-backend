import React, { useState } from "react";
import "./Contact-us.css";
import { ImFacebook2 } from "react-icons/im";
import { GrTwitter, GrInstagram, GrLinkedin, GrYoutube } from "react-icons/gr";
import Grid from "@material-ui/core/Grid";
import PrimaryFooter from "../../components/primaryFooter/PrimaryFooter";
import axios from "axios";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailData = {
      name: name,
      mobile: mobile,
      email: email,
      topic: topic,
      message: message,
    };
    console.log("submitted values", emailData);
    try {
      const response = await axios.post(
        "http://localhost:5000/NodeMailer/send_mail",
        emailData
      );
      if (!response.data.success) throw new Error(response.data.message);
      alert(response.data.message);
    } catch (error) {
      alert(error.message);
    }

    // @TODO: send data email to backend
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div>
      <div className="container">
        <div className="container__contact-us">
          <Grid
            container
            alignItems={"center"}
            alignContent={"flex-end"}
            xs={12}
            md={12}
            spacing={2}
          >
            <Grid container item xs={false} md={1} />
            <Grid
              container
              item
              xs={12}
              md={4}
              alignItems={"center"}
              alignContent={"center"}
            >
              <form onSubmit={handleSubmit} className="app__form">
                <h1>Email Form</h1>
                <div className="app__form__contact-us">
                  <input
                    value={name}
                    onChange={handleNameChange}
                    className="fname"
                    type="text"
                    id="fname"
                    placeholder="Full Name"
                    required
                  ></input>
                  <br />
                  <input
                    value={mobile}
                    onChange={handleMobileChange}
                    className="mnumber"
                    type="number"
                    id="mnumber"
                    placeholder="Mobile Number"
                  ></input>
                  <br />
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    className="email"
                    type="email"
                    id="email"
                    placeholder="Email"
                    required
                  ></input>
                  <br />
                  <select
                    value={topic}
                    onChange={handleTopicChange}
                    className="topic"
                    id="topic"
                    required
                  >
                    <option value="select">Select</option>
                    <option value="item-enquiry">Item enquiry</option>
                    <option value="it-support">IT Support</option>
                    <option value="order-follow-up">Order Follow-up</option>
                  </select>
                  <br />
                  <textarea
                    value={message}
                    onChange={handleMessageChange}
                    className="comment"
                    type="text"
                    id="comment"
                    placeholder="Message"
                  ></textarea>
                  <br />
                  <button type="submit" className="btn">
                    Send Message
                  </button>
                </div>
              </form>
            </Grid>
            <Grid container item xs={false} md={2} />
            <Grid
              container
              item
              xs={12}
              md={4}
              alignItems={"center"}
              alignContent={"center"}
            >
              <div className="app__contact-info">
                <div className="contact-1">
                  <h1>Contact us</h1>
                  <p>We will answer any question that you might have</p>
                </div>
                <div className="address">
                  <h3>Lebanon</h3>
                  <p>Phone number: +961 3 123 456</p>
                  <p>Address: Kaslik, Lebanon</p>
                </div>
                <div className="address">
                  <h3>Saudi Arabia</h3>
                  <p>Phone number: +966 3 123 456</p>
                  <p>Address: Riyadh, KSA</p>
                </div>
                <div className="app__follow-us">
                  <h3 className="follow-us">Follow us</h3>
                  <div className="contact-us__icon">
                    <a href="https://www.facebook.com/" target="blank">
                      <ImFacebook2 color="rgba(66,104,179,255)" size="2rem" />
                    </a>
                    <a href="https://twitter.com/?lang=en" target="blank">
                      <GrTwitter color="rgba(29,171,221,255)" size="2rem" />
                    </a>
                    <a href="https://www.instagram.com/" target="blank">
                      <GrInstagram color="rgba(201,59,140,255)" size="2rem" />
                    </a>
                    <a href="https://www.linkedin.com/" target="blank">
                      <GrLinkedin color="rgba(2,116,179,255)" size="2rem" />
                    </a>
                    <a href="https://www.youtube.com/" target="blank">
                      <GrYoutube color="red" size="2rem" />
                    </a>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid container item xs={false} md={1} />
          </Grid>
        </div>
      </div>
      <PrimaryFooter />
    </div>
  );
};

export default ContactUs;
