import dotenv from "dotenv"
import createServer from "./server.js"
dotenv.config()
// import {signin} from "./controllers/usercontrollers.js"

const app=createServer()


app.listen(3001,()=>{
    console.log("Server running on port 3001")
} )


