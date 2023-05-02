const  jwt = require('jsonwebtoken');


const auth = async(req,res,next)=>{
    const token = req.headers.authorization;

    if(token){
        try {
            const decoded = jwt.verify(token.split(" ")[1]||token, process.env.Secret);
            if(decoded){
                req.body.userID = decoded.userID;
                req.body.postBy = decoded.postBy;
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
