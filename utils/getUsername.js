const jwt=require('jsonwebtoken')
const getUserData=(req)=>{
    const auth = req.headers.authorization;
    const token = auth.split(' ')[1];
    const userData = jwt.decode(token,'cat');
    console.log("🔥 userdata: ",userData)

    return userData;
}

module.exports = getUserData