const express=require('express')
const Auth=require('../../middleware/auth')
const router=express.Router()
const {justify}=require('../../function')
const User=require('../../models/client')
const jwt=require('jsonwebtoken')

var user=[]

router.route('/add').post(async(req,res)=>{
    const existinguser= await User.findOne({email:req.body.email})
        if (existinguser){
           return res.status(400).json({messsage:'Error User exist!!'})
        }
    const createuser=new User({email:req.body.email})
          createuser.save()
          res.status(200).json({message:"User created"})
})

router.route('/justify').post(Auth,async(req,res)=>{
    
    res.type("text/plain")
    justify(req,res,user,req.body)

})

router.route('/token').post(async(req,res)=>{
    const existinguser =await User.findOne({email:req.body.email})
    if (!existinguser){
        res.status(400).json({message:"user not found"})
    }
        jwt.sign({ email: req.body.email }, 'tictac', { expiresIn: '24h' },(err, token) => {
        user[token] = { words: 0, date: new Date() }
        res.json({
            token
        })
    })
  
    
})


module.exports=router