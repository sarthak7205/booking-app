const express=require('express')
const app=express()
const sequelize=require("./util/database")
const User = require('./models/user');

const adminRoutes=require('./routes/admin')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
const { FORCE } = require('sequelize/lib/index-hints')

app.use('/',adminRoutes)
sequelize.sync({force:true}).then(result=>{
    
   
    console.log(result)


})
                             
app.use('/',(req,res)=>{

    res.send("hello")

})


app.listen(3000)

