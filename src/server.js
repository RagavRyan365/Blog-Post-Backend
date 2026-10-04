import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import signup from "./Auth/Signup.js";
import signin from "./Auth/Signin.js";

dotenv.config();
const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/user/signup",signup);//signup route
app.use("/user/signin",signin);//signin route



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
