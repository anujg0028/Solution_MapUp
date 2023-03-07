const express=require('express');
const app=express();
const Router=require('./Routes/users');
const bodyparser=require('body-parser');

app.use(bodyparser.json());
app.use('/users',Router);
app.listen(3000,()=>console.log("server is running"));