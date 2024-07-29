const jwt=require('jsonwebtoken')
const getUserData=(req,res)=>{
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    const userData = jwt.decode(token,'cat');
    try{
        // console.log("🔥 userdata: ",userData)
        res.status(200).json({data: userData});
    }catch(e){
        console.log("ERROR SENDING USERDATA RESP: ",e);
    }
    return userData;
}

module.exports = getUserData