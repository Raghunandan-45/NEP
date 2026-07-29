import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

const authMiddleware = async (req,res,next)=>{
    console.log("Auth Middleware reached");
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    } else if(req.cookies.jwt){
        token = req.cookies.jwt;
    }

    if(!token){
        return res.status(401).json({error:"Not Authorized, no token provided!"});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: {id: decoded.id},
        });

        if(!user){
            return res.status(401).json({error:"User no longer authorized!"});
        }

        req.user = user;
        next();
    } catch(err){
        return res.status(401).json({error: "User no longer exists!"});
    }   
}

export {authMiddleware};