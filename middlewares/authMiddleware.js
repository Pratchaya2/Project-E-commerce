const jwt = require("jsonwebtoken");
const users = require("../models/users");
const {JWT_secret} = require("../configs/env");

//เช็ค login
const authenticate = (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(403).json({message:"Token is requied"});
    }

    try{
        const decoded = jwt.verify(token,JWT_secret); //decode คืนค่าเป็น object {id:result.id,name:result.name,role:result.role}
        req.user = decoded; //เก็บ decode ไว้ใน req.user
        next();
    }

    catch(error) {
        return res.status(403).json({message:"Invalid or expired token"})
    }
}

//เช็ค role
const authorize = (roles=[]) => (req,res,next) => {
    if(!roles.includes(req.user.role)){
        return res.status(403).json({message:"You don't have access"})
    }
    next();
}

module.exports = {authenticate,authorize};
