const  jwt = require('jsonwebtoken');


const auth = (req,res,next)=>{
    const token = req.headers.authorization;
    // console.log(token)
    if(token){
        try {
            const decoded = jwt.verify(token.split(" ")[1]||token, process.env.Secret);
            // console.log(decoded)
            if(decoded){
                // console.log(decoded)
                req.body["postID"] = decoded.postID;
                req.body["postBy"] = decoded.postBy;
                console.log(req.body)
                next();
            }else{
                res.send({msg:"Please Login!!"})
            }
        } catch (error) {
            res.status(400).send(error.message)
        }
    }else{
        res.send({msg:"Please Login!!"})
    }
}

module.exports = {
    auth
}
