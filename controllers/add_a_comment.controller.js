const Posts = require('../models/posts.model');
const getUserData = require('../utils/getUsername');
const mongoose = require('mongoose');
const users =  require('../models/user.model');
const generate_UID = require('../utils/uidGenerator');

const addComment = async (req, res) => {
    const { comment, post,id, profilePicC } = req.body;
    var user,doc;
    const comment_id = generate_UID();
    try {
        console.log("POST AND COMMENT", post, comment, profilePicC);
    
        if (!comment || !post) {
            return res.status(400).json({ message: "Post and comment are required" });
        }
        
        user = getUserData(req);
    
        if (!user) {
            return res.status(401).json({ message: "Unauthorized user" });
        }
        console.log("*&*&&*&*&* ",user)
        // const objectId = new mongoose.Types.ObjectId(post_id);
        doc = await Posts.findById(id);
        if (!doc) {
            return res.status(404).json({ message: "Post not found" });
        }
        console.log("Found the doc to comment on", doc);
    } catch (e) {
        console.log("ERROR FINDING POST TO COMMENT ON: ", e);
        return res.status(500).json({ message: "Internal server error" });
    }

    try{
        const comment_author = await users.find({username:user.username})
        console.log("FOUND THE USER: ",comment_author)
    }catch(e){
        console.log("ERROR FINDING THE USER: ",e);
    }

    try {
        doc.post.comments.push({
            commentBy: user.username,
            profilePicC:profilePicC,
            comment: comment,
            likedBy: [],
            comment_id: comment_id,
            date: new Date().toISOString()
        });
        await doc.save();
        console.log("Saved the updated doc with comment");
        return res.status(201).json({ message: "Comment added successfully" });
    } catch (e) {
        console.log("ERROR UPDATING THE POST WITH COMMENT: ", e);
        return res.status(500).json({ message: "Failed to add comment" });
    }
};

module.exports = addComment;
