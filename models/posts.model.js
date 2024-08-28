const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    commentBy:String,
    profilePicC:String,
    likedBy: [
        {
            username: String,
            uid: String
        }
    ],
    comment_id: String,
    date: Date
});

const postSchema = new mongoose.Schema({
    post: {
        likes: {
            type: Number,
            default: 0
        },
        content: {
            type: String
        },
        likedBy: {
            type: Array
        },
        comments: [commentSchema]
    },
    metaData: {
        type: Object
    },
    upid: {
        type: String
    },
    postImg:{
        type: String
    },
    category:{
        type: String
    }
}, {
    timestamps: true
});

const Posts = mongoose.model('Posts', postSchema);
module.exports = Posts;
