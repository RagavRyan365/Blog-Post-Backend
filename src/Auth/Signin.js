import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

import DB from "../DataBase/connectionDB.js";

const signin = express.Router();

async function verifyEmail(req,res,next){
  const {email} = req.body;
  const searchQuery = "SELECT username FROM users WHERE email = $1";
  try{
    const data = await DB.query(searchQuery,[email]);
    if(data.rowCount == 0){
      return res.status(401).json({"ok":false,"message":"Email does not exist"});
    }
    next();
  }catch(err){
    console.log(err);
    return res.status(500).json({"ok":false,"message":"Internal server error"});
  }
}

async function verifyCredentials(req,res,next){
  const {email,password} = req.body;
  const userQuery = "SELECT password FROM users WHERE email = $1";
  try{
    const data = await DB.query(userQuery,[email]);
    const hashPassword = data.rows[0].password;
    if(!(await bcrypt.compare(password,hashPassword))){
      return res.status(401).json({"ok":false,"message":"User Credentials is invalid"});
    }
    next();
  }catch(err){
    return res.status(500).json({"ok":false,"message":"Internal server error"});
  }
}

signin.post("/",verifyEmail,verifyCredentials,async(req,res)=>{
  const {email,password} = req.body;
  const userDataQuery = "SELECT id,username FROM users WHERE email = $1";
  try{
    const data = await DB.query(userDataQuery,[email]);
    const payLoad = {
      id:data.rows[0].id,
      username:data.rows[0].username
    };
    const token = await jwt.sign(payLoad,process.env.JWT_SECRET,{expiresIn:'1h'});
    return res.status(200).json({"ok":true,"message":"User signin successfully","token":token});
  }catch(err){
    return res.status(500).json({"ok":false,"message":"Internal server error"});
  }
});



export default signin;
