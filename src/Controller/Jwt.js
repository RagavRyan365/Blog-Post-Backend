import jwt from "jsonwebtoken";



// async function refresh(req,res,next){
//     jwt.verify(req.cookie.refreshToken,process.env.REFRESH_JWT_TOKEN,(err,payload)=>{
//         if(err)return res.status(401).json({"code":"InvalidRefreshToken","message":"Invalid or expired Refresh token"});
//         const decodedPayload = payload;
//         jwt.verify(req.header.authToken,process.env.ACCESS_JWT_TOKEN,(err)=>{
//             if(err){
//                 const newAccessToken = jwt.sign(decodedPayload,process.env.ACCESS_JWT_TOKEN,{expiresIn:"15m"})
//             }
//         });
//     })
// }