const posts_db = require('../models/posts.model')
const generate_UID = require('../utils/uidGenerator')
const makePost = async(req,res)=>{
    const {post, metaData} = req.body;
    const upid=generate_UID();
    const data = {
        post: post,
        metaData: metaData,
        upid: upid
    }
    console.log(data)

    try{
        console.log("🟡 Making a post by ",metaData.author);
        await posts_db.create(data);
        console.log("🟢 Done Making a post by ",metaData.author);
        res.status(201).json({message: "Post Create Successfully"});
    }catch(e){
        console.log("🔴 Error creating Post: ",e);
        res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports = makePost