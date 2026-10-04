import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import DB from "../DataBase/connectionDB.js";

const signin = express.Router();

//verify the user's email exist
async function verifyEmail(req,res,next){
  const {email} = req.body;
  const searchQuery = "SELECT username FROM users WHERE email = $1";
  try{
    const data = await DB.query(searchQuery,[email]);
    if(data.rowCount == 0){
      return res.status(401).json({"code":"UserNotExist","message":"Email does not exist"});
    }
    next();
  }catch(err){
    console.log(err);
    return res.status(500).json({"code":"Internal","message":"Internal server error"});
  }
}

//verify the credentials of the user
async function verifyCredentials(req,res,next){
  const {email,password} = req.body;
  const userQuery = "SELECT password FROM users WHERE email = $1";

  try{
    const data = await DB.query(userQuery,[email]);
    const hashPassword = data.rows[0].password;

    if(!(await bcrypt.compare(password,hashPassword))){

      return res.status(401).json({"code":"InvalidCredentials","message":"User Credentials is invalid"});

    }
    next();
  }catch(err){

    return res.status(500).json({"code":"Internal","message":"Internal server error"});

  }
}

signin.post("/",verifyEmail,verifyCredentials,async(req,res)=>{
  const {email} = req.body;
  const userDataQuery = "SELECT id,username FROM users WHERE email = $1";

  try{
    //Getting use data from db for the payload in the jwt
    const data = await DB.query(userDataQuery,[email]);
    const payLoad = {
      id:data.rows[0].id,
      username:data.rows[0].username
    };

    //Jwt Token generation
    const accessToken = await jwt.sign(payLoad,process.env.ACCESS_JWT_SECRET,{expiresIn:'15m'});
    const refreshToken = await jwt.sign(payLoad,process.env.REFRESH_JWT_SECRET,{expiresIn:'7d'});

    res.cookie("refreshToken",refreshToken,{
      httpOnly:true,
      secure: process.env.DEV_STATE == "dev"?false:true,//determind by the env file
      sameSite:"lax"
    });

    return res.status(200).json({"code":"Done","message":"User signin successfully","accessToken":accessToken});
  }catch(err){

    return res.status(500).json({"code":"Internal","message":"Internal server error"});

  }
});



export default signin;
