import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
    res.json({
        "OK":true,
        "Message":"Welcome to the blog post"
    })
});




app.listen(process.env.PORT || 5050,()=>{
    console.log("Server is running on port 5000");
});