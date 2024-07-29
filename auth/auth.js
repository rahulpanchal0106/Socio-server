const jwt=require('jsonwebtoken')

const auth=async(req,res,next)=>{

    try{
        var authorization = req.headers.authorization;
        if(!authorization || !authorization.startsWith('Rho')){
            return res.status(401).json({message:"Token is required"});
        }
        
        // console.log(authorization)
        const token = authorization.split(' ')[1]
        // console.log(token)
    
        if(!token){
            console.log(token);
    
            return res.status(401).json({message:"Token is required"})
        }
    
        
        const d=jwt.verify(token,'cat');
        // console.log(d);
    }catch(e){
        console.error("ERROR IN AUTH.JS: ",e)
    }

    next()
}
module.exports=auth;