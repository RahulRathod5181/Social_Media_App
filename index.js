const express = require("express");
const {connect} = require("./db")
const app = express();
const { userRouter} = require("./Routes/user.routes");
const { postRouter } = require("./Routes/post.routes");
const { auth } = require("./Middleware/Auth.middleware");
require("dotenv").config();
app.use(express.json())
app.use("/users",userRouter);


app.use(auth)
app.use("/post",postRouter);





app.listen(process.env.PORT,async()=>{
    try {
        await connect
        console.log("Connect to DB");
    } catch (error) {
        console.log(error.message);
    }
    console.log("Server is running at Port:",process.env.PORT);
})