const { response } = require("express");
const express = require("express");
const router = express.Router();
const app = express();
require("dotenv").config();
const nodemailer = require("nodemailer");

router.post("/send_mail", async (req, res) => {
  try {
    let { text } = req.body;
    console.log(req.body);
    const smtpConfig = {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    };
    const transport = nodemailer.createTransport(smtpConfig);

    await transport.sendMail(
      {
        from: req.body.email,
        to: process.env.MAIL_USER,
        subject: "test email",
        html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>Here is your email!</h2>
        <p>${text}</p>
    
        <p>All the best, Bachir4</p>
         </div>
    `,
      },
      (error, response) => {
        if (error) {
          return res.json({ success: false, message: error.message });
        }
        return res.json({
          success: true,
          message: "Message has been successfully sent",
        });
      }
    );
  } catch (err) {
    res.json(err.message);
  }
});

module.exports = router;