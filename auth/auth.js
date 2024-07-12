const jwt=require('jsonwebtoken')

const auth=async(req,res,next)=>{
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
    console.log(d);

    next()
}
module.exports=auth;