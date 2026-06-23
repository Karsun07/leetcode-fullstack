const validate=require("../utils/validate");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const User = require("../models/user");

const register=async (req,res)=>{
    try{
        // validate firstName, email and Password
        validate(req.body);
        const {firstName,emailId,password}=req.body;
        req.body.password=await  bcrypt.hash(password,10);
        
        // create user
        const user=await User.create(req.body);
        // generate token
        const token=jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge: 60*60*1000});
        res.status(201).send("User Registered Successfully");
    }
    catch(err){
        res.status(400).send("Error:"+err);

    }
}

const login=async (req,res)=>{
    try{
        const {emailId,password}=req.body;
        if(!emailId){
            throw new Error("Invalid Email");
        }
        if(!password){
            throw new Error("Invalid Password");
        }

        // find the user
        const user=await User.findOne({emailId});
        const isMatch=bcrypt.compare(password,user.password);

        if(!isMatch){
            throw new Error("Invalid Credential");
        }
        const token =  jwt.sign({_id:user._id , emailId:emailId},process.env.JWT_KEY,{expiresIn: 60*60});
        res.cookie('token',token,{maxAge: 60*60*1000}); 
        res.status(200).send("Logged In Succeessfully");
    }
    catch(err){
        console.log("error"+err);
    }
}
const logout=(req,res)=>{
    try{

    }
    catch(err){
        
    }
}

module.exports={register,login,logout};
