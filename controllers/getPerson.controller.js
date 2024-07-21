const userModel = require("../models/user.model");

const getPerson=async(req,res)=>{
    const {username} = req.body;
    try{
        const userdata = await userModel.findOne({username:username});


        console.log("🐸🐸 ",username)
        res.status(200).json(userdata);
    }catch(e){
        res.status(400).json({message:`ERROR FINDING USER ${username}`});
        console.log("ERROR GETTING USER PROFILE: ",e);
    }


}
module.exports = getPerson