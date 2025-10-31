const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../configs/db");
const users = require("../models/users");
const {JWT_secret} = require("../configs/env");

const register = async(req,res) => {
    const {name,password,email} = req.body;
    
    if(!name||!password|!email) {
        return res.status(400).json({message:"Name,Password and Eamil are required"});
    }
    
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        const result = await users.CreateUser(name,email,hashedPassword);
        res.status(201).json({message:"User registered successfulll"});
    }

    catch(error){
        console.log("Error registered user :",error);
        res.status(500).json({message:"Failed to registered"});
    }
};

const login = async(req,res) => {
    const {email,password} = req.body;

    if(!email||!password) {
        return res.status(400).json({message:"Email and Eamil are required"});
    }

    try{
        const result = await users.GetUserByEmail(email,password);
        if(!result){
            return res.status(404).json({message:"User not found"});
        }
        const isPasswordMatch = await bcrypt.compare(password,result.password);
        if(!isPasswordMatch){
            return res.status(401).json({message:"Email or Password is wrong"})
        }
        console.log("JWT_Secret :",JWT_secret);

        const token = jwt.sign(
            {id:result.id,name:result.name,role:result.role},JWT_secret,{expiresIn:"1h"}
        );
        res.status(201).json({message:"Login successful",token});
    }

    catch(error) {
        console.error("Error loging user : ",error);
        res.status(500).json({message:"Failed to login"})
    }
}

module.exports = {register,login}