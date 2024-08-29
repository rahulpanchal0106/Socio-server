const posts_db = require('../models/posts.model');
const LikedPostsDB = require('../models/liked.model');
const getUserData = require('../utils/getUsername');
const userModel = require('../models/user.model');
const searchPf = require('../utils/searchPf');
const searchPerson = require('../utils/searchPerson');

const getFeed = async (req, res) => {
    const userData = getUserData(req);
    
    try {
        const userDoc = await userModel.findOne({ username: userData.username });
        console.log("🟡 Fetching feed");

        let feed;
        const likedPosts = await LikedPostsDB.find({ userId: userData.uid });
        const likesArray = likedPosts
            .filter(el => el.category)
            .map(el => el.category);

        // console.log(likesArray);

        if (likesArray.length > 0) {
            feed = await posts_db.find({});

            const categoryMap = likesArray.reduce((acc, category) => {
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {});
    
            // console.log(categoryMap);
    
            feed.sort((a, b) => {
                const aCategory = a.category || 'Unknown';
                const bCategory = b.category || 'Unknown';
                return (categoryMap[bCategory] || 0) - (categoryMap[aCategory] || 0);
            });

            // Fetch all authors' data in one go to reduce DB queries
            const uniqueAuthors = [...new Set(feed.map(post => post.metaData.author))];
            const authorDataMap = {};

            for (const author of uniqueAuthors) {
                const authorData = await searchPerson(author);
                if (authorData) {
                    authorDataMap[author] = authorData.profilePicture;
                }
            }

            for (const postObj of feed) {
                if (postObj.postImg === 'none') {
                    console.log("⚠️ No postImg in post with id: ", postObj._id);
                    const driveData = await searchPf(postObj.upid);
                    if (driveData) {
                        await posts_db.updateOne(
                            { _id: postObj._id },
                            { $set: { postImg: driveData.id } }
                        );
                        console.log("🔄 Updated postImg for post with id: ", postObj._id);
                    }
                }
                
                const authorProfilePic = authorDataMap[postObj.metaData.author];
                console.log(postObj.metaData.profilePicture, " && ",authorProfilePic)
                if (authorProfilePic && postObj.metaData.profilePicture !== authorProfilePic && postObj.metaData.profilePicture) {
                    await posts_db.updateOne(
                        { _id: postObj._id },
                        { $set: { "metaData.profilePicture": authorProfilePic } }
                    );
                }else if(!authorProfilePic){
                    await posts_db.updateOne(
                        { _id:postObj._id },
                        { $set : { "metaData.profilePicture":null } }
                    )
                }
            }

            const values = Object.values(categoryMap);
            const maxValue = Math.max(...values);
            const maxKey = Object.keys(categoryMap).find(key => categoryMap[key] === maxValue);

            console.log(userData.username, " likes ", maxKey, " the most.");

            if (!userDoc.category_pref || userDoc.category_pref[0] !== maxKey) {
                userDoc.category_pref = [maxKey];
                await userDoc.save();
                console.log("🟢 User profile updated with new category preference.");
            }

            console.log("🟢 Feed fetched successfully for", userData.username);
        } else {
            feed = await posts_db.find({});
        }

        if (feed.length > 0) {
            return res.status(200).json(feed);
        } else {
            const needs_cat_selection = [0, 0];
            return res.status(200).json(needs_cat_selection);
        }

    } catch (e) {
        console.log("Error fetching feed: ", e);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = getFeed;
