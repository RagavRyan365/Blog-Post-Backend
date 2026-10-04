import express from "express";
import {v4} from "uuid";
import bcrypt from "bcryptjs";
import DB from "../DataBase/connectionDB.js";

const signup = express.Router();

//checks whether username or email allready exist in db
async function checkUser(req,res,next){
    const {username,email} = req.body;
    const user = await DB.query("SELECT username FROM users WHERE username = $1 OR email = $2",[username,email]);
    //if the any user already exist rowCount will have non zero number
    if(user.rowCount != 0){
        return res.status(401).json({"code":"UserAlreadyThere","message":"Username Or Email is Already exist"});
    }
    next();
}


signup.post("/",checkUser,async(req,res)=>{
    const{username,email,password,firstname,lastname} = req.body;
    //hasing the plane password
    const hashPassword = await bcrypt.hash(password,10);

    try{
        const insert = "INSERT INTO users VALUES($1,$2,$3,$4,$5,$6)";
        const data = await DB.query(insert,[v4(),username,firstname,lastname,email,hashPassword]);
        return res.status(201).json({"ok":true,"message":"User signup successfully"});
    }catch(err){
        console.log(err);
        return res.status(500).json({"error":err});
    }
});

export default signup;
