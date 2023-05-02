const express = require("express");
var jwt = require('jsonwebtoken');
const { PostModel } = require("../Model/Post.model");
const postRouter = express.Router();
require("dotenv").config()

postRouter.post("/addpost",async(req,res)=>{
    let deviceArr = ["PC","TABLET","MOBILE"]
    // console.log(req)
    if(deviceArr.includes(req.body.device)){

        try {
            // const post = new PostModel(req.body);
            // await post.save();
            res.status(200).send({msg:`New post Added by ${req.body.postBy}`})
        } catch (error) {
            res.status(400).send(error.message)
        }
    }else{
        res.status(400).send({msg:"You Selected wrong Device"})
    }
})




module.exports = {
    postRouter
}
