

const mongoose = require("mongoose");


const postSchema = mongoose.Schema({
    title:{type:String,require:true},
    body:{type:String,require:true},
    device:{type:String,require:true},
    postID:{type:String,require:true},
    postBy:{type:String,require:true},
    
},{
    versionKey:false
})

const PostModel = mongoose.model("post",postSchema);

module.exports = {
    PostModel
}