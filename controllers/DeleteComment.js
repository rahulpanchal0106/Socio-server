const Posts = require("../models/posts.model");
const getUserData = require("../utils/getUsername");

const DeleteComment = async (req, res) => {
    const { post_id, comment_id } = req.body;
    const userData = getUserData(req);
    let post;

    try {
        post = await Posts.findOne({ upid: post_id });
        if (!post) {
            console.log("POST not found");
            return res.status(404).json({ message: "Post not found" });
        }
        console.log("POST FOUND!", post);
    } catch (e) {
        console.log("ERROR FETCHING POST TO REMOVE: ", e);
        return res.status(400).json({ message: "Failed to delete comment" });
    }

    post.post.comments = post.post.comments.filter(comment => comment.comment_id !== comment_id);

    try {
        await post.save();
        res.status(200).json({ message: "COMMENT DELETED SUCCESSFULLY" });
    } catch (e) {
        console.log("ERROR SAVING POST: ", e);
        res.status(500).json({ message: "Failed to save post after deleting comment" });
    }
}

module.exports = DeleteComment;
