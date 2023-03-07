require('dotenv').config();
const express=require('express');
const {createUsers}=require('../controllers/users');
const router=express.Router();
const jwt=require('jsonwebtoken');

const authenticate=(req,res,next)=>{
    const authHeader=req.headers['authorization'];
    const token=authHeader&&authHeader.split(" ")[1];
    console.log(token);
    if(token==null)return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err)res.send(401,"error");
        req.user=user;
        next();
    })
}

//router.get('/',authenticate,getUsers);
router.get('/',createUsers);

module.exports=router;