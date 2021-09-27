const jwt=require('jsonwebtoken')

const Auth=async(req,res,next)=>{

  try {
            const token= await req.headers.authorization
             if (token){
                 decodedata= jwt.verify(token,'tictac')
                 req.token=token
             }
             next()
         } catch (error) {
            res.status(403).json({message:"Token invalid or expired",status:403})
    }
}

module.exports=Auth