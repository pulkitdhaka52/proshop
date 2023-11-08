import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//protect routes
const protect = asyncHandler(async (req, resp, next) => {
    let token;
    //read the jwt from the cookie...
    token = req.cookies.jwt;
      
    if(token){
        try {
            const decoded =  jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            console.log(error);
            resp.status(401);
            throw new Error('Not authorized! Invalid token');
        }
    }else{
        resp.status(401);
        throw new Error('Not authorized!');
    }
})

//Admin middleware

const admin = (req, resp, next) => {
    if(req.user && req.user.isAdmin){
        next();    
    }else{
        resp.status(401);
        throw new Error('Not Authorised as admin');
    }
}

export {protect, admin };