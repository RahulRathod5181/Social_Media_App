const express = require("express");
const {connect} = require("./db")
const app = express();
const { userRouter} = require("./Routes/user.routes")
require("dotenv").config();
app.use(express.json())
app.use("/users",userRouter);






app.listen(process.env.PORT,async()=>{
    try {
        await connect
        console.log("Connect to DB");
    } catch (error) {
        console.log(error.message);
    }
    console.log("Server is running at Port:",process.env.PORT);
})