import userSchema from "../models/User-model";
import bcrypt from "bcryptjs";
import { response } from "express";
// import jwt from 'jsonwebtoken'

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
    if (userInfo.length > 0) throw new Error("User already exists");

    await user.save();
  
    res.json({success:true,message:"User added succefully!" , data: userss})


    res.json();
  } catch (err) {
    handleError(err,res);
  }
};

const handleError = (err , response)=>{
    response.json({success:false,message:err.message})
}

export const getUser = (req, res) => {
  res.json("Get user");
};
export const addUser = (req, res) => {
  res.json("Add user");
};
