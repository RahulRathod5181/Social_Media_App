const {UserModel} = require("../Model/User.model")
const bcrypt = require('bcrypt');
const express = require("express");

const userRouter = express.Router();


userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password} = req.body;
    // console.log(req.body)
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            const user = new UserModel({name,email,gender,password:hash})
            await user.save()
            res.status(200).send({msg:"New User Registered Succesfully"})
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
})

userRouter.post("/login",async(req,res)=>{
    
})


module.exports = {
    userRouter
}