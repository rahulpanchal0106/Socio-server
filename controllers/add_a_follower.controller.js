const userModel = require('../models/user.model');
const getUserData = require('../utils/getUsername');

const AddFollower = async (req, res) => {
    const { uidTo } = req.body;
    const userData = getUserData(req);
    const unameBy = userData.username;
    console.log("Received user ID to follow/unfollow: ", uidTo, " -> ", unameBy);

    try {
        console.log("Finding the users...");
        const ToDoc = await userModel.findOne({ uid: uidTo });
        const ByDoc = await userModel.findOne({ username: unameBy });

        if (!ToDoc) {
            console.log("UserTo not found");
            return res.status(404).json({ message: "UserTo not found" });
        }
        if (!ByDoc) {
            console.log("UserBy not found");
            return res.status(404).json({ message: "UserBy not found" });
        }

        // Check if the user is already following
        const isAlreadyFollowing = ToDoc.followers.some(follower => follower.uid === ByDoc.uid);

        if (isAlreadyFollowing) {
            // Remove follower
            ToDoc.followers = ToDoc.followers.filter(follower => follower.uid !== ByDoc.uid);
            console.log(`${ToDoc.username} was unfollowed by ${ByDoc.username}`);
            await ToDoc.save();

            ByDoc.following = ByDoc.following.filter(following => following.uid !== ToDoc.uid);
            console.log(`${ToDoc.username} was removed from ${ByDoc.username}'s Following list`);
            await ByDoc.save();

            return res.status(200).json({ message: "Successfully unfollowed the user" });
        } else {
            // Add follower
            const followerData = {
                uid: ByDoc.uid,
                username: ByDoc.username
            };
            ToDoc.followers.push(followerData);
            console.log(`${ToDoc.username} was followed by ${ByDoc.username}`);
            await ToDoc.save();

            const followingData = {
                uid: ToDoc.uid,
                username: ToDoc.username
            };
            ByDoc.following.push(followingData);
            console.log(`${ToDoc.username} was added to ${ByDoc.username}'s Following list`);
            await ByDoc.save();

            return res.status(200).json({ message: "Successfully followed the user" });
        }
    } catch (e) {
        console.log("Error Adding/Removing Follower: ", e);
        return res.status(500).json({ message: "Failed to update followers", error: e.message });
    }
};

module.exports = AddFollower;