const mongoose=require('mongoose')

const Schema=mongoose.Schema

const postschema=new Schema({
    
    email:{type:String,required:true}
  
})

const User=mongoose.model('users',postschema)

module.exports= User