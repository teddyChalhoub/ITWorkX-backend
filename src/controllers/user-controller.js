import userSchema from "../models/User-model";
import bcrypt from "bcryptjs";
import { response } from "express";
import jwt from "jsonwebtoken";
import UserRole from "../models/User-role-model";
import Role from "../models/Role-model";
import orderModel from "../models/order-model";

export const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.password, salt);

    const user = new userSchema({
      name: req.body.name,
      email: req.body.email,
      password: hashPass,
      company: req.body.company,
      nbofemployee: req.body.nbofemployee,
      country: req.body.country,
      address: req.body.address,
      notes: req.body.notes,
    });

    const userInfo = await userSchema.find({ email: req.body.email });
    console.log(userInfo);
    if (userInfo.length > 0) {
      throw new Error("User already exists");
    }

    const userData = await user.save();

    const userRole = new UserRole({
      user_id: userData._id,

      role_id: "60f1ddf7b4b75e59c196d2c8",
    });
    const userRoleData = await userRole.save();

    userData.user_role.push(userRoleData._id);

    const data = await userData.save();

    const order = new orderModel({
      user: userData._id,
    });

    await order.save();

    res.json({
      success: true,
      message: "User added successfully!",
      data: data,
    });
  } catch (err) {
    handleError(err, res);
  }
};

export const logIn = async (req, res, next) => {
  try {
    const user = await userSchema
      .findOne({ email: req.body.email })
      .populate("user_role");
    if (!user) return res.send({ msg: "Not Existing User" });
    console.log(user);

    const validPass = bcrypt.compareSync(req.body.password, user.password);
    console.log(validPass);
    if (!validPass) return res.send({ msg: "Wrong Password" });

    const token = jwt.sign({ _id: user._id }, "dsfsdfsdfsdgfghh");
    res.send({ authToken: token });
  } catch (err) {
    handleError(err, res);
  }
};

export const tokenizer = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.send("Token not present");

  try {
    const verified = jwt.verify(token, "dsfsdfsdfsdgfghh");
    req.user = verified;
    next();
  } catch (err) {
    res.send("Invalid Token");
  }
};
export const isAdmin = async (req, res, next) => {
  try {
    console.log(req.user._id);
    const user = await userSchema.findById({ _id: req.user._id });
    const userRole = await UserRole.findById({ _id: user.user_role[0] });
    const role = await Role.findById({ _id: userRole.role_id });
    console.log(user);
    if (role.name === "admin") {
      next();
    } else {
      throw new Error("user is not a admin");
    }
  } catch (err) {
    handleError(err, res);
  }
};

// export const isAdmin = async (req, res, next) => {
//   try {
//     console.log(req.user._id);
//     const user = await userSchema.findById({ _id: req.user._id });
//     const userRole = await UserRole.findById({ _id: user.user_role[0] });
//     const role = await Role.findById({ _id: userRole.role_id });
//     console.log(user);
//     if (role.name === "user") {
//       next();
//     } else {
//       throw new Error("user is not a admin");
//     }
//   } catch (err) {
//     handleError(err, res);
//   }
// };

const handleError = (err, response) => {
  response.json({ success: false, message: err.message });
};
