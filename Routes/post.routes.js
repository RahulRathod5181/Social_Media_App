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
            const post = new PostModel(req.body);
            await post.save();
            res.status(200).send({msg:`New post Added by ${req.body.postBy}`})
        } catch (error) {
            res.status(400).send(error.message)
        }
    }else{
        res.status(400).send({msg:"You Selected wrong Device"})
    }
})

postRouter.get("/",async(req,res)=>{
    const {device} = req.query
    console.log(req.body)
    try {
        const post = await PostModel.find({$and:[{postID:req.body.postID},device]});
        
        res.send(post)
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    const {id} = req.params;
    const post  = await PostModel.findOne({_id:id});
    try {
        if(req.body.postID!==post.postID){
            res.status(200).send({mgs:"You Cannot update Other's Post"})
        }else{
            await PostModel.findByIdAndUpdate({_id:id},req.body)
            res.status(200).send({msg:`The post by ${post.postBy} is updated Succesfully`})
        }
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    const {id} = req.params;
    const post  = await PostModel.findOne({_id:id});
    try {
        if(req.body.postID!==post.postID){
            res.status(200).send({mgs:"You Cannot Delete Other's Post"})
        }else{
            await PostModel.findByIdAndDelete({_id:id})
            res.status(200).send({msg:`The post by ${post.postBy} is Deleted Succesfully`})
        }
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})




module.exports = {
    postRouter
}
