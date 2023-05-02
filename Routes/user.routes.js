const {UserModel} = require("../Model/User.model")
const bcrypt = require('bcrypt');
const express = require("express");
var jwt = require('jsonwebtoken');
const userRouter = express.Router();
require("dotenv").config()

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
    const {email,password} = req.body;
    const user = await UserModel.findOne({email});
    try {
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                // result == true
                if(result){
                    var token = jwt.sign({userID:user._id, postBy:user.name}, process.env.Secret);
                    res.status(200).send({msg:"Login Succesfull",token:token})
                    
                }else{
                    res.status(200).send({msg:"Wrong Credientials!!"})
                }
            });
        }else{
            res.status(200).send({msg:"Wrong Credientials!!"})
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = {
    userRouter
}