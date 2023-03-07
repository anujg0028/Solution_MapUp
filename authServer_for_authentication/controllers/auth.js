require('dotenv').config();
const jwt=require('jsonwebtoken'); 
const register=require('../model/loginDetails');
const sequelize=require('sequelize'); 
const bcrypt=require('bcrypt'); //used to encript the password

//use for storing refresh token and also use for getting new access token
let refreshToken=[];

//encripting the password
async function securePassword(password) {
    const passWord=await bcrypt.hash(password,10);
    return passWord;
}

//new user registration
const registerUser=async (req,res)=>{
    try{
        const data=req.body;
        data.password=await securePassword(data.password);//password encription
        const singleUser=register.build(data);
        singleUser.save().then((result)=>res.json("user register successfully")).catch((err)=>console.log(err));
    }
    catch(err)
    {
        console.log(err);
    }
}

//getting access token
function generatetoken(user){
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'100s'});
}

//user login
const login=async(req,res)=>{

    const id=Number(req.body.id); //fetching data from request body
    const password=req.body.password;
    const singleuser={id,password};

    let users=await register.findAll({where:{id:id}}); //feching data from DB
    const passwordChecker=await bcrypt.compare(password,users[0].dataValues.password);//validating the password

    if(users.length==0)res.json("404 error");
    else if(!passwordChecker)res.json("404 bad request");

    const accessToken=generatetoken(singleuser);//generating access token
    const refressToken=jwt.sign(singleuser,process.env.REFRESH_TOKEN_SECRET);//generating refresh token
    refreshToken.push(refressToken);

    res.json({"accessToken":accessToken,"refressToken":refressToken});
}

//getting new access token when the old one get expires only when refresh token is valid
const refress=(req,res)=>{

    const Rtoken=req.body.token; //feching refresh token from request body
    if(Rtoken==null)res.sendsTATUS(401);
    if(!refreshToken.includes(Rtoken))res.sendStatus(403);
    
    jwt.verify(Rtoken,process.env.REFRESH_TOKEN_SECRET,(err,user)=>{ //verifying refresh token
        const accessToken=generatetoken({id:user.id,password:user.password});
        res.json({accessToken: accessToken});
    })
}

//loging out the user
const logOut=(req,res)=>{
    refreshToken=refreshToken.filter(token=>token!=req.body.token)
    res.sendStatus(204);
}

module.exports={registerUser,login,refress,logOut};