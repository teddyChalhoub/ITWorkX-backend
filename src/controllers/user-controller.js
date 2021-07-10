import userSchema from '../models/User-model';
import bcrypt from 'bcryptjs';
import { response } from 'express';
// import jwt from 'jsonwebtoken'

export const register = (req, res, next) => {
    /*let oldUser = userSchema.find({name:req.body.name},(error, data) =>{
        
        return res.json ({success:false, message: "User already exists" });
    });
*/

    bcrypt.hash(req.body.password.toString(),10,function(err, hashedPass) {
        if (err) {
            res.json({
                error: err.message
            });
        } 
            let user = new userSchema ({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            company: req.body.company,
            nbofemployee : req.body.nbofemployee,
            country : req.body.country,
            address : req.body.address,
            notes : req.body.notes,
        });  
            user.save()
            .then(user => { 
                res.json({
                    success: true,
                    message : 'User added Successfully!',
                });
            })
            .catch(error => {
                res.json({
                    success: false,
                    message: 'User already exists'
                });
            });
    });
};

export const getUser = (req, res) => { 
    res.json("Get user");
};
export const addUser = (req, res) => { 
    res.json("Add user");
};