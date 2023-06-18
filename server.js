import  express  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import {signup,signin, userDetailUpdate} from "./controllers/usercontrollers.js";
dotenv.config()
// import {signin} from "./controllers/usercontrollers.js"
const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.post("/user/signup",signup)
app.post("/user/signin",signin)
app.patch("/user/update",userDetailUpdate)

app.listen(3001,()=>{
    console.log("Server running on port 3001")
} )


