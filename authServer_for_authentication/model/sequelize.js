const Sequelize=require('sequelize');
//connecting my SQL DB
const sequelize=new Sequelize('anuj','sa','root',{
    dialect:'mssql',
    host:'localhost'
});

module.exports=sequelize;