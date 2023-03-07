const express=require('express');
const {registerUser,login,refress,logOut}=require('../controllers/auth');
const router=express.Router();

router.post('/register',registerUser);
router.post('/login',login);
//geting new access token using refresh token
router.post('/token',refress);
router.post('/logout',logOut);

module.exports=router;