const Sequelize=require('sequelize')
const sequelize=new Sequelize('cus','root','Sarthak@2000',
{
    dialect:'mysql',
    host:'localhost'
})
module.exports=sequelize