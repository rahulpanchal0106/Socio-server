const posts_db = require('../models/posts.model');
const LikedPostsDB = require('../models/liked.model');
const getUserData = require('../utils/getUsername');
const userModel = require('../models/user.model');
const searchPf = require('../utils/searchPf');
const searchPerson = require('../utils/searchPerson');
const getFeed = async (req, res) => {
    const userData = getUserData(req);
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 25;
    var categoryMap=[];

    try {
        const userDoc = await userModel.findOne({ username: userData.username });
        console.log("🟡 Fetching feed");

        const likedPosts = await LikedPostsDB.find({ userId: userData.uid });
        const likesArray = likedPosts.filter(el => el.category).map(el => el.category);
        
        let feed = [];
        if (likesArray.length > 0) {
            categoryMap = likesArray.reduce((acc, category) => {
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {});

            
            feed = await posts_db.aggregate([
                {
                    $addFields: {
                        categoryScore: { $cond: { if: { $in: ["$category", Object.keys(categoryMap)] }, then: 1, else: 0 } }
                    }
                },  
                { $sort: { categoryScore: -1, createdAt: -1 } }, //It cn only sort to 32 Keys
                { $skip: offset },
                { $limit: limit }
            ]);

            console.log(`😶‍🌫️ Making the feed from index ${offset} - ${offset + limit}, Remaining posts ${feed.length}`);
        } else {

            feed = await posts_db
                .find({})
                .sort({ createdAt: -1 })
                .skip(offset)
                .limit(limit)
                // .lean();
        }
        const uniqueAuthors = [...new Set(feed.map(post => post.metaData.author))];
        const authorDataMap = {};

        console.log("🔥🔥🔥🔥 ",feed.length)

        await Promise.all(uniqueAuthors.map(async (author) => {
            const authorData = await searchPerson(author);
            if (authorData) {
                authorDataMap[author] = authorData.profilePicture;
            }
        }));
        await Promise.all(feed.map(async (postObj) => {
            if (postObj.postImg === 'none') {
                const driveData = await searchPf(postObj.upid);
                if (driveData) {
                    await posts_db.updateOne(
                        { _id: postObj._id },
                        { $set: { postImg: driveData.id } }
                    );
                }
            }

            const authorProfilePic = authorDataMap[postObj.metaData.author];
            if (authorProfilePic && postObj.metaData.profilePicture !== authorProfilePic) {
                await posts_db.updateOne(
                    { _id: postObj._id },
                    { $set: { "metaData.profilePicture": authorProfilePic } }
                );
            } else if (!authorProfilePic) {
                await posts_db.updateOne(
                    { _id: postObj._id },
                    { $set: { "metaData.profilePicture": null } }
                );
            }
        }));

        const values = Object.values(categoryMap);
        const maxValue = Math.max(...values);
        const maxKey = Object.keys(categoryMap).find(key => categoryMap[key] === maxValue);

        if (likesArray.length > 0 && (!userDoc.category_pref || userDoc.category_pref[0] !== maxKey)) {
            userDoc.category_pref = [maxKey];
            await userDoc.save();
            console.log("🟢 User profile updated with new category preference.");
        }

        console.log("🟢 Feed fetched successfully for", userData.username);

        const totalPostsCount = await posts_db.countDocuments({});
        return res.status(200).json({ paginatedFeed: feed, total: totalPostsCount });

    } catch (e) {
        console.log("Error fetching feed: ", e);
        res.status(500).json({paginatedFeed:[],total:0});
    }
};


module.exports = getFeed;
