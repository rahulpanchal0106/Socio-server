const getUserData = require("../utils/getUsername");
const Posts = require('../models/posts.model');
const userModel = require("../models/user.model");

const likeComment = async (req, res) => {
    const { comment_id, post_id } = req.body;
    const user = getUserData(req);

    try {
        const userData = await userModel.findOne({ username: user.username });
        if (!userData) {
            console.log("User not found");
            return res.status(404).send("User not found");
        }

        const post = await Posts.findOne({ upid: post_id });
        if (!post) {
            console.log("POST not found");
            return res.status(404).send("POST not found");
        }

        const comment = post.post.comments.find(comment => comment.comment_id == comment_id);
        if (!comment) {
            console.log("COMMENT not found");
            return res.status(404).send("COMMENT not found");
        }

        const alreadyLikedIndex = comment.likedBy.findIndex(like => like.username == user.username);
        if (alreadyLikedIndex !== -1) {
            comment.likedBy.splice(alreadyLikedIndex, 1);
            console.log(user.username, "REMOVED LIKE FROM THIS COMMENT");
        } else {
            comment.likedBy.push(user);
            console.log(user.username, "LIKED THIS COMMENT");
        }
        console.log(comment.likedBy)
        await post.save();

        res.status(200).json({message: "COMMENT LIKE UPDATED"});
    } catch (e) {
        console.log("ERROR PROCESSING LIKE: ", e);
        res.status(500).send("Error processing like");
    }
}

module.exports = likeComment;
