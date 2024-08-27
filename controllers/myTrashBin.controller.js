const { model } = require('mongoose');
const deleted_posts_db = require('../models/deleted.model');
const getUserData = require('../utils/getUsername')
const trashBin=async(req,res)=>{
    const user = getUserData(req);
    try{
        console.log("🟡 fetching trashed posts");
        const data=await deleted_posts_db.find({"metaData.author":user.username});
        console.log("🟢 fetched trashed posts for ",user.username);

        res.status(200).json(data);
    }catch(e){
        console.log("🔴 Error fetching trashed posts");
        res.status(500).json({message:"Error fetching trashed posts"});
    }
}

module.exports = trashBin