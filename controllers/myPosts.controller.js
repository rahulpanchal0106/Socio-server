const getUserData = require('../utils/getUsername')
const posts_db = require('../models/posts.model')
const myPosts = async(req,res)=>{
    const userData = getUserData(req);
    try{
        console.log(`-----Fetching posts made by ${userData.username}----- `)
        const name = userData.username;
        const myPosts = await posts_db.find({"metaData.author":name});
        res.status(200).json(myPosts);
        console.log("🟢 My Posts fetched successfully for",userData.username);
    }catch(e){
        console.log("🔴 ERROR fetching posts by ",userData.username,"\n",e);
        res.status(500).json({message:"Internal Server Error"});
    }

}
module.exports = myPosts