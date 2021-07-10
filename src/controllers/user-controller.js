import userSchema from '../models/User-model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register = (req, res, next) => {
    bcrypt.hash(req.body.password,10,function(err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new userSchema ({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            reenterpassword: req.body.reenterpassword,
            company: req.body.company,
            numberofemployee : req.body.numberofemployee,
            country : req.body.country,
            address : req.body.address,
            notes : req.body.notes,
        }) 
            user.save()
            .then(user => {
                res.json({
                    success: true , message : 'User added Successfully!'
                })
            })
            .catch(error => {
                res.json({
                    success: false , message: 'An error occured!'
                })
            })
    })  
}

module.exports = {
    register
}






exports.getUser = (req, res) => { 
    res.json("Get user");
}
exports.addUser = (req, res) => { 
    res.json("Add user");
}