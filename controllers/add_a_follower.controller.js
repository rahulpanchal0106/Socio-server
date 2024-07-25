const Post = require('../models/posts.model');
const getUserData = require('../utils/getUsername');
const LikedPostsDB = require('../models/liked.model');
const userModel = require('../models/user.model')

const AddFollower = async (req, res) => {
    const { uidTo } = req.body;
    const userData = getUserData(req);
    const unameBy = userData.username;
    console.log("Received post ID: ", uidTo, " -> ", unameBy);

    try {
        console.log("Finding the user...");
        const ToDoc = await userModel.findOne({uid:uidTo});
        const ByDoc = await userModel.findOne({username:unameBy});
        if (!ToDoc) {
            console.log("UserTo not found");
            return res.status(404).json({ message: "UserTo not found" });
        }
        if (!ByDoc) {
            console.log("UserBy not found");
            return res.status(404).json({ message: "UserBy not found" });
        }

        // console.log("UserTo found: ", ToDoc);
        // console.log("UserBy found: ", ByDoc);
        // console.log("User data: ", userData);

        unameTo = ToDoc.username;

        // const existingFollow = await LikedPostsDB.findOne({ postId: id, userId: userData.uid });
        // const existingFollow = ;
        // if (existingLike) {
           
        //     post.post.likes = Math.max(0, post.post.likes - 1); 

        //     await LikedPostsDB.deleteOne({ postId: id, userId: userData.uid });
        //     console.log("Like removed from liked posts collection");

        //     post.post.likedBy = post.post.likedBy.filter(
        //         like => like.uid !== userData.uid
        //     );

        //     console.log("Saving the updated post...");
        //     const savedPost = await post.save();
        //     console.log("Post saved: ", savedPost);

        //     return res.status(200).json({ message: "You have already liked this post, so unliked", liked: false, post: savedPost });
        // }

        // console.log("Incrementing the like count...");
        // post.post.likes += 1;

        // await LikedPostsDB.create({ postId: id, userId: userData.uid });
        ToDoc.followers.push(ByDoc);
        console.log(ToDoc.username," was followed by ",ByDoc.username);
        ToDoc.save();
        
        ByDoc.following.push(ToDoc);
        console.log(ToDoc.username," was added to ",ByDoc.username,"'s Following list");
        ByDoc.save();

        

        return res.status(200).json({ message: "Followers and Following list updated Successfully" });

    } catch (e) {
        console.log("Error Addig Follower: ", e);
        return res.status(500).json({ message: "Failed to updater followers", error: e.message });
    }
};

module.exports = AddFollower;
