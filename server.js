import  express  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import {signup,signin, userDetailUpdate, getspecificuser} from "./controllers/usercontrollers.js";
import { deletepost, getspecificpost, postcreation } from "./controllers/postcontroller.js";


function createServer(){
 const app=express()
   app.use(express.json())
   app.use(cookieParser())
   app.use(cors())
   app.post("/user/signup",signup)
app.post("/user/signin",signin)
app.patch("/user/update",userDetailUpdate)
app.get("/user/single",getspecificuser)
app.post("/post/create",postcreation)
app.get("/post/specific/:id",getspecificpost)
app.delete("/post/delete/:id",deletepost)
 return app
}
export default createServer