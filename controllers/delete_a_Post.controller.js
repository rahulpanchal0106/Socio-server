const posts_db = require('../models/posts.model');
const deleted_posts_db = require('../models/deleted.model');
const getUserData = require('../utils/getUsername')

const deletePost = async (req, res) => {
    const { id } = req.body;
    const userData = getUserData(req);
    // console.log("&&&&&&&&&&&&& ", id);

    try {
        console.log("🟡 Finding the post");
        const post = await posts_db.findById(id);
        if (!post) {
            console.log("🔴 Post not found");
            return res.status(404).json({ message: "Post not found" });
        }
        // console.log(post,"   ",userData)
        if(post.metaData.author!=userData.username){
            console.log("🔴 UnAuthorized to delete the post");
            return res.status(401).json({message:`The post is owned by ${post.metaData.author}, so you cannot delete it`})
        }

        console.log("🟡 Moving the post to trash bin");
        const deletedPost = {
            ...post._doc,  // Spread the post document to ensure proper structure
            deletedAt: new Date()  // Add any additional properties if needed
        };
        await deleted_posts_db.create(deletedPost);
        console.log("🟢 Post moved to trash bin");

        console.log("🟡 Deleting the post");
        await posts_db.findByIdAndDelete(id);
        console.log("🟢 Post deleted successfully");

        return res.status(200).json({ message: "Post deleted successfully" });

    } catch (e) {
        console.log("🔴 Error processing request\n", e);
        return res.status(500).json({ message: "Failed to delete the post", error: e.message });
    }
};

module.exports = deletePost;
