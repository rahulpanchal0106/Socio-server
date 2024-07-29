const posts_db = require('../models/posts.model')
// const jwt = require('jsonwebtoken');
const getUserData = require('../utils/getUsername');
const getFeed = async (req,res)=>{
    // const auth = req.authorization;
    const userData = getUserData(req);
    // console.log("🌟🌟🌟 ",userData)
    try{
        console.log("🟡 Fetching feed");
        const feed = await posts_db.find({});
        console.log("🟢 Feed fetched successfully for",userData.username);
        res.status(200).json(feed);
    }catch(e){
        console.log("Error fetching feed: ",e);
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports = getFeed;