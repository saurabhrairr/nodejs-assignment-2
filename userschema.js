const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({

       name:String,
       email:String,
       isPromoted:Boolean

})
const usermodel=new mongoose.model("user",userSchema)
module.exports=usermodel;



//this file to use datatype like name which data type to store so we used schema 