const getUserData = require('../utils/getUsername')
const posts_db = require('../models/posts.model')
const myPosts = async(req,res)=>{
    // var {username} = req.body;
    const {username} = req.body
    // if(!username){

    //     const userData = getUserData(req);
    //     username=userData.username;
    // }
    try{
        console.log(`-----Fetching posts made by ${username}----- `)
        const name = username;
        const myPosts = await posts_db.find({"metaData.author":name});
        res.status(200).json(myPosts);
        console.log("🟢 My Posts fetched successfully for",username);
    }catch(e){
        console.log("🔴 ERROR fetching posts by ",username,"\n",e);
        res.status(500).json({message:"Internal Server Error"});
    }

}
module.exports = myPosts