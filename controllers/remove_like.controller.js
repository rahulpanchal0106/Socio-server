const LikedPostsDB = require('../models/liked.model');
const Post = require('../models/posts.model'); // To decrement the like count
const getUserData = require('../utils/getUsername');

const unLike = async (req, res) => {
    const { id } = req.body;
    const userData = getUserData(req);
    console.log("Received post ID for unlike: ", id);

    try {
        console.log("Checking if the like exists...");
        const existingLike = await LikedPostsDB.findOne({ postId: id, userId: userData.uid });

        if (!existingLike) {
            console.log("Like not found");
            return res.status(404).json({ message: "Like not found" });
        }

        console.log("Removing the like...");
        await LikedPostsDB.deleteOne({ postId: id, userId: userData.uid });
        console.log("Like removed from liked posts collection");

        console.log("Decrementing the like count on the post...");
        const post = await Post.findById(id);
        if (post) {
            post.post.likes = Math.max(0, post.post.likes - 1);
            await post.save();
            console.log("Post like count updated");
        }

        return res.status(200).json({ message: "Post unliked successfully", post: post });
    } catch (e) {
        console.error("Error processing unlike: ", e);
        return res.status(500).json({ message: "Failed to unlike the post", error: e.message });
    }
};

module.exports = unLike;
