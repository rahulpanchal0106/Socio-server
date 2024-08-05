const Post = require('../models/posts.model');
const getUserData = require('../utils/getUsername');
const LikedPostsDB = require('../models/liked.model');


const likePost = async (req, res) => {
    const { id } = req.body;
    const userData = getUserData(req);
    console.log("Received post ID: ", id);

    try {
        console.log("Finding the post...");
        const post = await Post.findById(id);
        if (!post) {
            console.log("Post not found");
            return res.status(404).json({ message: "Post not found" });
        }

        console.log("Post found: ", post);
        console.log("User data: ", userData);

        const existingLike = await LikedPostsDB.findOne({ postId: id, userId: userData.uid });
        if (existingLike) {
           
            post.post.likes = Math.max(0, post.post.likes - 1); 

            await LikedPostsDB.deleteOne({ postId: id, userId: userData.uid });
            console.log("Like removed from liked posts collection");

            post.post.likedBy = post.post.likedBy.filter(
                like => like.uid !== userData.uid
            );

            console.log("Saving the updated post...");
            const savedPost = await post.save();
            console.log("Post saved: ", savedPost);

            return res.status(200).json({ message: "You have already liked this post, so unliked", liked: false, post: savedPost });
        }

        console.log("Incrementing the like count...");
        post.post.likes += 1;

        await LikedPostsDB.create({ 
            postId: id, 
            userId: userData.uid, 
            category: post.category?post.category:"" });
        console.log("Post added to liked posts collection");

        post.post.likedBy.push({ username: userData.username, uid: userData.uid });

        console.log("Saving the updated post...");
        const savedPost = await post.save();
        // console.log("Post saved: ", savedPost);

        return res.status(200).json({ message: "Post liked successfully", liked: true, post: savedPost });

    } catch (e) {
        console.log("Error processing request: ", e);
        return res.status(500).json({ message: "Failed to like the post", error: e.message });
    }
};

module.exports = likePost;
