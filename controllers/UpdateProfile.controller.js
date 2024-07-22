const userModel = require("../models/user.model");

const UpdateProfile = async (req, res) => {
    const { bio, username } = req.body;

    try {
        const user = await userModel.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (bio) {
            user.bio = bio;
        } else {
            console.log("No bio field provided to update");
        }

        await user.save();
        res.status(200).json({ message: "User data updated successfully" });
    } catch (e) {
        console.error("Error finding or updating user:", e);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = UpdateProfile;
